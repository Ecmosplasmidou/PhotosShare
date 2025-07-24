import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  // Configuration de l'application
  get appName(): string {
    return environment.appName;
  }

  get appVersion(): string {
    return environment.appVersion;
  }

  get appDescription(): string {
    return environment.appDescription;
  }

  get isProduction(): boolean {
    return environment.production;
  }

  // Configuration API
  get apiUrl(): string {
    return environment.apiUrl;
  }

  // Configuration des super-utilisateurs (sécurisée)
  get superUsers(): Array<{ username: string; email: string }> {
    // En production, les super-utilisateurs sont récupérés depuis les variables d'environnement
    // pour des raisons de sécurité (aucun credential dans le code source public)
    
    if (this.isProduction) {
      // Variables d'environnement Netlify injectées au build
      const username = (globalThis as any).NG_APP_SUPER_USER_1_USERNAME;
      const email = (globalThis as any).NG_APP_SUPER_USER_1_EMAIL;
      
      if (username && email) {
        return [{ username, email }];
      }
      
      // Fallback sécurisé : aucun super-utilisateur si variables non configurées
      console.warn('🚨 Variables d\'environnement super-utilisateur non configurées');
      return [];
    }
    
    // En développement, permettre plusieurs méthodes de configuration
    
    // 1. Variables d'environnement locales (.env.local)
    const envUsername = (globalThis as any).NG_APP_SUPER_USER_1_USERNAME;
    const envEmail = (globalThis as any).NG_APP_SUPER_USER_1_EMAIL;
    
    if (envUsername && envEmail) {
      return [{ username: envUsername, email: envEmail }];
    }
    
    // 2. Configuration temporaire en localStorage (pour développement)
    const tempUser = localStorage.getItem('temp_super_user');
    if (tempUser) {
      try {
        const parsed = JSON.parse(tempUser);
        return [{ username: parsed.username, email: parsed.email }];
      } catch (e) {
        console.warn('Configuration temporaire invalide');
      }
    }
    
    // 3. Fallback de développement
    return [
      { 
        username: 'dev_test', 
        email: 'test@localhost' 
      }
    ];
  }

  // Configuration Firebase (pour future utilisation)
  get firebaseConfig(): any {
    return environment.firebase;
  }

  // Méthodes utilitaires
  isSuperUser(username: string, email: string): boolean {
    const superUsers = this.superUsers;
    
    if (superUsers.length === 0) {
      console.warn('🚨 Aucun super-utilisateur configuré');
      return false;
    }
    
    return superUsers.some(
      superUser => superUser.username === username && superUser.email === email
    );
  }

  // Méthode pour configurer temporairement un super-utilisateur (développement uniquement)
  setTempSuperUser(username: string, email: string): void {
    if (this.isProduction) {
      console.error('🚨 Configuration temporaire non autorisée en production');
      return;
    }
    
    localStorage.setItem('temp_super_user', JSON.stringify({
      username,
      email,
      createdAt: new Date().toISOString()
    }));
    
    console.log('✅ Super-utilisateur temporaire configuré:', { username, email });
  }

  // Méthode pour supprimer la configuration temporaire
  clearTempSuperUser(): void {
    localStorage.removeItem('temp_super_user');
    console.log('🗑️ Configuration temporaire supprimée');
  }

  // Log des configurations (seulement en développement)
  logConfiguration(): void {
    if (!this.isProduction) {
      console.group('🔧 Configuration de l\'application');
      console.log('📱 Nom:', this.appName);
      console.log('🔢 Version:', this.appVersion);
      console.log('📝 Description:', this.appDescription);
      console.log('🌐 API URL:', this.apiUrl);
      console.log('👥 Super-utilisateurs configurés:', this.superUsers.length > 0);
      console.log('🔥 Firebase:', this.firebaseConfig);
      console.groupEnd();
    }
  }
}
