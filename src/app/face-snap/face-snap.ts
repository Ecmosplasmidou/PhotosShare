import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoShare } from '../models/photoShare';
import { Router } from '@angular/router';

@Component({
  selector: 'app-face-snap',
  imports: [CommonModule],
  templateUrl: './face-snap.html',
  styleUrl: './face-snap.scss'
})
export class FaceSnapComponent{
@Input() faceSnap!: PhotoShare;

constructor(private router: Router) {}

  onViewFaceSnap(){
    this.router.navigateByUrl(`/facesnaps/${this.faceSnap.id}`);
  }

  onImageError(event: any) {
    console.error('Erreur de chargement d\'image pour:', this.faceSnap.title, 'URL:', this.faceSnap.imageUrl);
    // Remplacer par une image par défaut
    event.target.src = 'https://via.placeholder.com/400x250/cccccc/666666?text=Image+non+disponible';
  }

  onImageLoad(event: any) {
    console.log('Image chargée avec succès pour:', this.faceSnap.title);
  }

  getUserInitial(): string {
    // Récupérer la première lettre du titre ou un emoji par défaut
    return this.faceSnap.title ? this.faceSnap.title.charAt(0).toUpperCase() : '👤';
  }

  getTimeSince(date: Date): string {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - new Date(date).getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'à l\'instant';
    if (diffInMinutes < 60) return `il y a ${diffInMinutes}m`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `il y a ${diffInHours}h`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `il y a ${diffInDays}j`;
    
    return new Date(date).toLocaleDateString('fr-FR');
  }

  getCommentsCount(): number {
    return this.faceSnap.comments ? this.faceSnap.comments.length : 0;
  }
}

