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

  // Configuration des super-utilisateurs
  get superUsers(): Array<{ username: string; email: string }> {
    return environment.superUsers;
  }

  // Configuration Firebase (pour future utilisation)
  get firebaseConfig(): any {
    return environment.firebase;
  }

  // Méthodes utilitaires
  isSuperUser(username: string, email: string): boolean {
    return this.superUsers.some(
      superUser => superUser.username === username && superUser.email === email
    );
  }

  // Log des configurations (seulement en développement)
  logConfiguration(): void {
    if (!this.isProduction) {
      console.group('🔧 Configuration de l\'application');
      console.log('📱 Nom:', this.appName);
      console.log('🔢 Version:', this.appVersion);
      console.log('📝 Description:', this.appDescription);
      console.log('🌐 API URL:', this.apiUrl);
      console.log('👥 Super-utilisateurs:', this.superUsers);
      console.log('🔥 Firebase:', this.firebaseConfig);
      console.groupEnd();
    }
  }
}
