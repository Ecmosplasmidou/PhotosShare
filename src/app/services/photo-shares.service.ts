import { Injectable } from '@angular/core';
import { PhotoShare } from '../models/photoShare';
import { PhotoType } from '../models/photo-type.type';
import { Comment } from '../models/comment.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoSharesService {

    private faceSnaps : PhotoShare[] = [];

    constructor(private authService: AuthService) {
        this.loadFaceSnaps();
    }

    private loadFaceSnaps(): void {
        const savedFaceSnaps = localStorage.getItem('faceSnaps');
        if (savedFaceSnaps) {
            const parsedFaceSnaps = JSON.parse(savedFaceSnaps);
            this.faceSnaps = parsedFaceSnaps.map((snap: any) => {
                const photoShare = new PhotoShare(
                    snap.title,
                    snap.imageUrl,
                    snap.description,
                    new Date(snap.createdAt),
                    snap.snaps,
                    snap.hasSnapped,
                    snap.onSnapped,
                    snap.authorId
                );
                photoShare.id = snap.id;
                photoShare.comments = snap.comments || [];
                if (snap.location) {
                    photoShare.withLocation(snap.location);
                }
                return photoShare;
            });
        } else {
            // Initialiser avec des données d'exemple
            this.createDefaultData();
            this.saveFaceSnaps();
        }
    }

    private createDefaultData(): void {
        // Créer quelques photos d'exemple
        const defaultData = [
            new PhotoShare(
                'Belle vue sur la montagne',
                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
                'Une magnifique vue depuis le sommet de la montagne après une longue randonnée.',
                new Date('2024-12-01'),
                15,
                false,
                'snap',
                'demo-user-1'
            ).withLocation('Alpes françaises'),
            
            new PhotoShare(
                'Coucher de soleil sur la plage',
                'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=600&fit=crop',
                'Un moment magique capturé au bord de la mer.',
                new Date('2024-12-02'),
                23,
                false,
                'snap',
                'demo-user-2'
            ).withLocation('Côte d\'Azur'),
            
            new PhotoShare(
                'Chat mignon',
                'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=600&fit=crop',
                'Mon petit compagnon qui pose devant l\'objectif.',
                new Date('2024-12-03'),
                8,
                false,
                'snap',
                'demo-user-1'
            )
        ];

        this.faceSnaps = defaultData;
    }

    private saveFaceSnaps(): void {
        localStorage.setItem('faceSnaps', JSON.stringify(this.faceSnaps));
    }

    getFaceSnaps(): PhotoShare[] {
        // Trier par date de création (plus récent en premier)
        return [...this.faceSnaps].sort((a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }

    getFaceSnapById(faceSnapId: string): PhotoShare {
        const foundFaceSnap = this.faceSnaps.find((faceSnap: PhotoShare) => faceSnap.id === faceSnapId);
        if (!foundFaceSnap) {
            throw new Error('FaceSnap not found');
        }
        return foundFaceSnap;
    }

    snapWitId(faceSnapId: string, photoType: PhotoType): void {
        const faceSnap = this.getFaceSnapById(faceSnapId);
        faceSnap.snap(photoType);
        this.saveFaceSnaps(); // Sauvegarder après modification
    }

    addFaceSnap(faceSnap: PhotoShare): void {
        // Vérifier que l'utilisateur est connecté
        if (!this.authService.isLoggedIn()) {
            throw new Error('Vous devez être connecté pour ajouter un FaceSnap');
        }
        
        // Ajouter l'ID de l'auteur
        faceSnap.authorId = this.authService.getCurrentUserId()!;
        
        this.faceSnaps.push(faceSnap);
        this.saveFaceSnaps(); // Sauvegarder après ajout
    }

    deleteFaceSnap(faceSnapId: string): void {
        const currentUserId = this.authService.getCurrentUserId();
        if (!currentUserId) {
            throw new Error('Vous devez être connecté pour supprimer un FaceSnap');
        }

        const faceSnapIndex = this.faceSnaps.findIndex(snap => snap.id === faceSnapId);
        if (faceSnapIndex === -1) {
            throw new Error('FaceSnap not found');
        }

        const faceSnap = this.faceSnaps[faceSnapIndex];
        
        // Vérifier les permissions : propriétaire OU super-utilisateur
        if (faceSnap.authorId !== currentUserId && !this.authService.isSuperUser()) {
            throw new Error('Vous ne pouvez supprimer que vos propres FaceSnaps');
        }

        this.faceSnaps.splice(faceSnapIndex, 1);
        this.saveFaceSnaps(); // Sauvegarder après suppression
    }

    canDelete(faceSnapId: string): boolean {
        const currentUserId = this.authService.getCurrentUserId();
        if (!currentUserId) return false;

        // Super-utilisateur peut tout supprimer
        if (this.authService.isSuperUser()) return true;

        // Utilisateur normal peut supprimer ses propres posts
        const faceSnap = this.faceSnaps.find(snap => snap.id === faceSnapId);
        return faceSnap?.authorId === currentUserId;
    }

    addComment(faceSnapId: string, content: string): void {
        if (!this.authService.isLoggedIn()) {
            throw new Error('Vous devez être connecté pour commenter');
        }

        const faceSnap = this.getFaceSnapById(faceSnapId);
        const currentUser = this.authService.getCurrentUser();
        
        const comment: Comment = {
            id: crypto.randomUUID().substring(0, 8),
            authorId: currentUser!.id,
            authorName: currentUser!.username,
            content: content.trim(),
            createdAt: new Date(),
            faceSnapId: faceSnapId
        };

        faceSnap.comments.push(comment);
        this.saveFaceSnaps();
    }

    deleteComment(faceSnapId: string, commentId: string): void {
        const currentUserId = this.authService.getCurrentUserId();
        if (!currentUserId) {
            throw new Error('Vous devez être connecté pour supprimer un commentaire');
        }

        const faceSnap = this.getFaceSnapById(faceSnapId);
        const commentIndex = faceSnap.comments.findIndex(comment => comment.id === commentId);
        
        if (commentIndex === -1) {
            throw new Error('Commentaire non trouvé');
        }

        const comment = faceSnap.comments[commentIndex];
        
        // Vérifier que l'utilisateur est l'auteur du commentaire, l'auteur du post OU super-utilisateur
        if (comment.authorId !== currentUserId && 
            faceSnap.authorId !== currentUserId && 
            !this.authService.isSuperUser()) {
            throw new Error('Vous ne pouvez supprimer que vos propres commentaires');
        }

        faceSnap.comments.splice(commentIndex, 1);
        this.saveFaceSnaps();
    }

    canDeleteComment(faceSnapId: string, commentId: string): boolean {
        const currentUserId = this.authService.getCurrentUserId();
        if (!currentUserId) return false;

        // Super-utilisateur peut supprimer tous les commentaires
        if (this.authService.isSuperUser()) return true;

        const faceSnap = this.faceSnaps.find(snap => snap.id === faceSnapId);
        if (!faceSnap) return false;

        const comment = faceSnap.comments.find(c => c.id === commentId);
        if (!comment) return false;

        // L'utilisateur peut supprimer son propre commentaire ou s'il est l'auteur du post
        return comment.authorId === currentUserId || faceSnap.authorId === currentUserId;
    }

    // Méthode temporaire pour vider toutes les données (à utiliser avec prudence)
    clearAllData(): void {
        this.faceSnaps = [];
        this.saveFaceSnaps();
        console.log('Toutes les données ont été supprimées du localStorage');
    }
}
