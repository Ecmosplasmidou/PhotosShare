import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PhotoSharesService } from '../services/photo-shares.service';
import { AuthService } from '../services/auth.service';
import { PhotoShare } from '../models/photoShare';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-face-snap',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './new-face-snap.html',
  styleUrl: './new-face-snap.scss'
})
export class NewFaceSnapComponent implements OnInit {
  snapForm: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private photoSharesService: PhotoSharesService,
    private authService: AuthService,
    private router: Router
  ) {
    this.snapForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      imageFile: [null, [Validators.required]],
      location: [null]
    });
  }

  ngOnInit(): void {
    // Rediriger si l'utilisateur n'est pas connecté
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/login');
    }
  }

  onSubmitForm(): void {
    if (this.snapForm.valid && this.authService.isLoggedIn() && this.selectedFile) {
      try {
        const formValue = this.snapForm.value;
        
        // Convertir l'image en base64 pour le stockage local
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageDataUrl = e.target?.result as string;
          
          const newFaceSnap = new PhotoShare(
            formValue.title,
            imageDataUrl, // Utiliser l'image en base64
            formValue.description,
            new Date(),
            0,
            false,
            '🤍'
          );
          
          if (formValue.location) {
            newFaceSnap.withLocation(formValue.location);
          }
          
          this.photoSharesService.addFaceSnap(newFaceSnap);
          this.router.navigateByUrl('/facesnaps');
        };
        
        reader.readAsDataURL(this.selectedFile);
      } catch (error) {
        console.error('Erreur lors de l\'ajout du FaceSnap:', error);
        alert('Erreur lors de l\'ajout du FaceSnap. Veuillez vous connecter.');
      }
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.selectedFile = file;
      this.snapForm.patchValue({ imageFile: file });
      this.snapForm.get('imageFile')?.markAsTouched();
      
      // Créer un aperçu de l'image
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      alert('Veuillez sélectionner un fichier image valide.');
      this.selectedFile = null;
      this.imagePreview = null;
      this.snapForm.patchValue({ imageFile: null });
    }
  }

  removeImage(): void {
    this.selectedFile = null;
    this.imagePreview = null;
    this.snapForm.patchValue({ imageFile: null });
    this.snapForm.get('imageFile')?.markAsUntouched();
  }

  getUserInitial(): string {
    const currentUser = this.authService.getCurrentUser();
    return currentUser?.username.charAt(0).toUpperCase() || '👤';
  }
}
