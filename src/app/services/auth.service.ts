import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

export interface User {
  id: string;
  username: string;
  email: string;
  isSuperUser?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User | null = null;

  constructor(private configService: ConfigService) {
    this.loadUser();
    // Afficher la configuration en développement
    this.configService.logConfiguration();
  }

  private loadUser(): void {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
    }
  }

  private saveUser(): void {
    if (this.currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }

  login(username: string, email: string): boolean {
    // Vérifier si c'est un super-utilisateur en utilisant le ConfigService
    const isSuperUser = this.configService.isSuperUser(username, email);

    // Simulation d'une connexion simple
    this.currentUser = {
      id: crypto.randomUUID().substring(0, 8),
      username,
      email,
      isSuperUser
    };
    this.saveUser();
    return true;
  }

  logout(): void {
    this.currentUser = null;
    this.saveUser();
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  getCurrentUserId(): string | null {
    return this.currentUser?.id || null;
  }

  isSuperUser(): boolean {
    return this.currentUser?.isSuperUser === true;
  }

  canDeleteAnyPost(): boolean {
    return this.isSuperUser();
  }
}
