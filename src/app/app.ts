import { Component, OnInit, inject } from '@angular/core';
import { Header } from './header/header';
import { FooterComponent } from './footer/footer';
import { RouterOutlet } from '@angular/router';
import { ConfigService } from './services/config.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App implements OnInit {
  private configService = inject(ConfigService);

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
      
      console.log('');
      console.log('🔧 Pour débugger les problèmes mobile: tapez debugMobile()');
    }
  }
}
