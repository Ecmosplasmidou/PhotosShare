import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime } from 'rxjs';

export interface PageTransition {
  isTransitioning: boolean;
  direction: 'forward' | 'backward' | 'none';
  progress: number; // 0 à 1 pour suivre la progression
}

@Injectable({
  providedIn: 'root'
})
export class PageTransitionService {
  private transitionSubject = new BehaviorSubject<PageTransition>({
    isTransitioning: false,
    direction: 'none',
    progress: 0
  });

  public transition$ = this.transitionSubject.asObservable();
  private isTransitionInProgress = false;

  startTransition(direction: 'forward' | 'backward', immediate = false) {
    // Éviter les transitions multiples simultanées
    if (this.isTransitionInProgress && !immediate) {
      return;
    }

    this.isTransitionInProgress = true;
    
    // Phase 1: Début de transition
    this.transitionSubject.next({
      isTransitioning: true,
      direction,
      progress: 0
    });

    // Phase 2: Progression (pour des effets plus fluides)
    setTimeout(() => {
      this.transitionSubject.next({
        isTransitioning: true,
        direction,
        progress: 0.5
      });
    }, 100);

    // Phase 3: Fin de transition
    setTimeout(() => {
      this.transitionSubject.next({
        isTransitioning: false,
        direction: 'none',
        progress: 1
      });
      this.isTransitionInProgress = false;
    }, 600); // Durée totale de l'animation
  }

  // Détecter la direction basée sur la navigation - Version améliorée
  detectDirection(currentUrl: string, previousUrl: string): 'forward' | 'backward' {
    // Éviter les transitions sur la même page
    if (currentUrl === previousUrl) {
      return 'forward';
    }

    // Définir la hiérarchie des pages
    const pageHierarchy = [
      '/',
      '/landing',
      '/face-snaps',
      '/login',
      '/new-face-snap'
    ];

    // Pages de détail (contiennent un ID)
    const isDetailPage = (url: string) => {
      return url.includes('/face-snaps/') && url.split('/').length > 2;
    };

    // Navigation vers un détail = forward
    if (isDetailPage(currentUrl) && !isDetailPage(previousUrl)) {
      return 'forward';
    }

    // Retour depuis un détail = backward
    if (!isDetailPage(currentUrl) && isDetailPage(previousUrl)) {
      return 'backward';
    }

    // Comparer les niveaux dans la hiérarchie
    const currentLevel = pageHierarchy.findIndex(page => currentUrl.startsWith(page));
    const previousLevel = pageHierarchy.findIndex(page => previousUrl.startsWith(page));

    if (currentLevel !== -1 && previousLevel !== -1) {
      return currentLevel > previousLevel ? 'forward' : 'backward';
    }

    // Par défaut, détecter basé sur des patterns communs
    if (currentUrl.includes('/login') || currentUrl.includes('/new-')) {
      return 'forward';
    }

    if (currentUrl === '/' || currentUrl === '/face-snaps') {
      return 'backward';
    }

    return 'forward';
  }

  // Nouvelle méthode pour des transitions personnalisées
  customTransition(direction: 'forward' | 'backward', duration: number = 600) {
    this.isTransitionInProgress = true;
    
    this.transitionSubject.next({
      isTransitioning: true,
      direction,
      progress: 0
    });

    setTimeout(() => {
      this.transitionSubject.next({
        isTransitioning: false,
        direction: 'none',
        progress: 1
      });
      this.isTransitionInProgress = false;
    }, duration);
  }

  // Vérifier si une transition est en cours
  get isTransitioning(): boolean {
    return this.isTransitionInProgress;
  }
}
