import { Component, OnInit, inject, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Header } from './header/header';
import { FooterComponent } from './footer/footer';
import { RouterOutlet, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { ConfigService } from './services/config.service';
import { PageTransitionService } from './services/page-transition.service';
import { Subscription } from 'rxjs';
import { filter, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})


export class App implements OnInit, OnDestroy {
  private configService = inject(ConfigService);
  private router = inject(Router);
  private pageTransitionService = inject(PageTransitionService);
  private cdr = inject(ChangeDetectorRef);
  
  private subscription = new Subscription();
  private previousUrl = '';
  private navigationTimeout: any;
  
  isTransitioning = false;
  isTransitioningForward = false;
  isTransitioningBackward = false;
  transitionProgress = 0;

  ngOnInit() {
    // En développement, exposer le service dans la console et afficher les instructions
    if (!this.configService.isProduction) {
      (window as any).configService = this.configService;
      
      console.log('🚀 PhotoShare App - Mode Développement');
      console.log('');
      console.log('Pour vous configurer comme super-utilisateur:');
      console.log('%c1. Ouvrez la console du navigateur (F12)', 'color: #28a745; font-weight: bold;');
      console.log('%c2. Tapez: configService.setTempSuperUser("VotreUsername", "votre@email.com")', 'color: #007ACC; font-weight: bold;');
      console.log('%c3. Rechargez la page', 'color: #28a745; font-weight: bold;');
      console.log('');
      console.log('Pour supprimer la configuration: configService.clearTempSuperUser()');
      
      // Debug mobile - fonction utilitaire
      (window as any).debugMobile = () => {
        document.body.classList.toggle('debug-mobile');
        console.log('Debug mobile activé/désactivé - Les zones tactiles sont maintenant visibles');
      };

      // Test des transitions de page - Version améliorée
      (window as any).testTransition = (direction: 'forward' | 'backward' = 'forward') => {
        this.pageTransitionService.startTransition(direction, true);
        console.log(`🌊 Transition ${direction} déclenchée !`);
      };

      // Nouvelle fonction pour tester des transitions personnalisées
      (window as any).testCustomTransition = (direction: 'forward' | 'backward' = 'forward', duration: number = 800) => {
        this.pageTransitionService.customTransition(direction, duration);
        console.log(`✨ Transition personnalisée ${direction} (${duration}ms) déclenchée !`);
      };
      
      console.log('');
      console.log('🔧 Pour débugger les problèmes mobile: tapez debugMobile()');
      console.log('🌊 Pour tester les transitions: tapez testTransition("forward") ou testTransition("backward")');
      console.log('✨ Pour des transitions personnalisées: tapez testCustomTransition("forward", 1000)');
    }

    // Écouter le début de navigation pour préparer la transition
    this.subscription.add(
      this.router.events
        .pipe(filter(event => event instanceof NavigationStart))
        .subscribe((event: NavigationStart) => {
          // Préparer la transition si ce n'est pas déjà en cours
          if (!this.pageTransitionService.isTransitioning) {
            const direction = this.pageTransitionService.detectDirection(event.url, this.previousUrl);
            this.startTransition(direction);
          }
        })
    );

    // Écouter la fin de navigation
    this.subscription.add(
      this.router.events
        .pipe(
          filter(event => event instanceof NavigationEnd),
          debounceTime(50) // Éviter les transitions trop rapides
        )
        .subscribe((event: NavigationEnd) => {
          const currentUrl = event.urlAfterRedirects;
          
          // Ajouter une classe pour l'animation d'entrée de page
          setTimeout(() => {
            const pageContent = document.querySelector('.page-content');
            if (pageContent) {
              pageContent.classList.add('page-entering');
              setTimeout(() => {
                pageContent.classList.remove('page-entering');
              }, 300);
            }
          }, 300);
          
          // Sauvegarder l'URL actuelle pour la prochaine navigation
          this.previousUrl = currentUrl;
        })
    );

    // Écouter les changements de transition avec debounce pour la fluidité
    this.subscription.add(
      this.pageTransitionService.transition$
        .pipe(debounceTime(10))
        .subscribe(transition => {
          this.isTransitioning = transition.isTransitioning;
          this.isTransitioningForward = transition.isTransitioning && transition.direction === 'forward';
          this.isTransitioningBackward = transition.isTransitioning && transition.direction === 'backward';
          this.transitionProgress = transition.progress;
          
          // Forcer la détection des changements pour une UI fluide
          this.cdr.detectChanges();
        })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    if (this.navigationTimeout) {
      clearTimeout(this.navigationTimeout);
    }
  }

  private startTransition(direction: 'forward' | 'backward') {
    // Éviter de démarrer une transition si une est déjà en cours
    if (this.pageTransitionService.isTransitioning) {
      return;
    }

    this.pageTransitionService.startTransition(direction);
  }
}
