import { Component, OnInit } from '@angular/core';
import { TitleCasePipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PhotoShare } from '../models/photoShare';
import { PhotoSharesService } from '../services/photo-shares.service';
import { AuthService } from '../services/auth.service';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-single-face-snap',
  imports: [TitleCasePipe, RouterLink, CommonModule, FormsModule],

  templateUrl: './single-face-snap.html',
  styleUrl: './single-face-snap.scss'
})

export class SingleFaceSnapComponent implements OnInit{
faceSnap!: PhotoShare;
hasSnapped! : boolean;
onSnapped! : string;
commentContent: string = '';

constructor(
  private PhotoSharesService: PhotoSharesService,
  private authService: AuthService,
  private route: ActivatedRoute,
  private router: Router
) {}

ngOnInit(): void {
    this.prepareInterface();
    this.getFaceSnapById();
  }

onSnap() {
    if (!this.hasSnapped){
      this.snap()
    } else {
      this.unSnap()
    }
  }

  unSnap() {
    this.PhotoSharesService.snapWitId(this.faceSnap.id, 'unsnap');
    this.onSnapped = '🤍';
    this.hasSnapped = false;
  }

  snap() {
    this.PhotoSharesService.snapWitId(this.faceSnap.id, 'snap');
    this.onSnapped = '❤️';
    this.hasSnapped = true;
  }

  onDelete() {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce FaceSnap ?')) {
      try {
        this.PhotoSharesService.deleteFaceSnap(this.faceSnap.id);
        this.router.navigateByUrl('/facesnaps');
      } catch (error) {
        alert('Erreur : Vous ne pouvez supprimer que vos propres FaceSnaps');
      }
    }
  }

  canDelete(): boolean {
    return this.PhotoSharesService.canDelete(this.faceSnap.id);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getCurrentUser() {
    return this.authService.getCurrentUser();
  }

  getCurrentUserInitial(): string {
    const currentUser = this.authService.getCurrentUser();
    return currentUser?.username?.charAt(0).toUpperCase() || '👤';
  }

  onAddComment() {
    if (this.commentContent.trim() && this.isLoggedIn()) {
      try {
        this.PhotoSharesService.addComment(this.faceSnap.id, this.commentContent);
        this.commentContent = '';
        // Refresh the faceSnap to get updated comments
        this.getFaceSnapById();
      } catch (error) {
        alert('Erreur lors de l\'ajout du commentaire');
      }
    }
  }

  onDeleteComment(commentId: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
      try {
        this.PhotoSharesService.deleteComment(this.faceSnap.id, commentId);
        this.getFaceSnapById();
      } catch (error) {
        alert('Erreur lors de la suppression du commentaire');
      }
    }
  }

  canDeleteComment(commentId: string): boolean {
    return this.PhotoSharesService.canDeleteComment(this.faceSnap.id, commentId);
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

  private prepareInterface() {
    this.onSnapped = '🤍';
    this.hasSnapped = false;
  }

  private getFaceSnapById(){
    const faceSnapId = this.route.snapshot.params['id'];
    this.faceSnap = this.PhotoSharesService.getFaceSnapById(faceSnapId);
  }
}

