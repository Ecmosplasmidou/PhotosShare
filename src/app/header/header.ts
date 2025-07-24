import { Component, OnInit, OnDestroy, HostListener, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService, User } from '../services/auth.service';
import { PageTransitionService } from '../services/page-transition.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit, OnDestroy {

  menuOpen = false;
  
  private pageTransitionService = inject(PageTransitionService);

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Fermer le menu si on change d'orientation ou si la fenêtre est redimensionnée
  }

  ngOnDestroy(): void {
    // S'assurer que le scroll est rétabli si le composant est détruit
    this.enableBodyScroll();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    // Fermer le menu mobile si on passe en mode desktop
    if (event.target.innerWidth > 768 && this.menuOpen) {
      this.closeMenu();
    }
  }

  @HostListener('window:orientationchange')
  onOrientationChange(): void {
    // Fermer le menu lors du changement d'orientation
    if (this.menuOpen) {
      setTimeout(() => {
        if (window.innerWidth > 768) {
          this.closeMenu();
        }
      }, 100);
    }
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    this.toggleBodyScroll();
  }

  closeMenu(): void {
    this.menuOpen = false;
    this.enableBodyScroll();
  }

  private toggleBodyScroll(): void {
    if (this.menuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      this.enableBodyScroll();
    }
  }

  private enableBodyScroll(): void {
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getCurrentUser(): User | null {
    return this.authService.getCurrentUser();
  }

  isSuperUser(): boolean {
    return this.authService.isSuperUser();
  }

  onLogout(): void {
    this.authService.logout();
    // Navigation avec transition vers l'arrière
    this.navigateWithTransition('/', 'backward');
    this.closeMenu();
  }

  // Méthode pour naviguer avec une transition personnalisée
  navigateWithTransition(url: string, direction: 'forward' | 'backward' = 'forward'): void {
    this.pageTransitionService.startTransition(direction);
    setTimeout(() => {
      this.router.navigateByUrl(url);
    }, 100); // Petit délai pour que l'animation commence avant la navigation
  }
}
