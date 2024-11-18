import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_KEY = 'user';
  private currentUserSubject: BehaviorSubject<any>;

  constructor() {
    // Récupérer les données de l'utilisateur depuis le stockage local lors de l'initialisation du service
    const userStr = localStorage.getItem(this.STORAGE_KEY);
    const user = userStr ? JSON.parse(userStr) : null;
    this.currentUserSubject = new BehaviorSubject<any>(user);
  }

  // Observable pour suivre les changements dans les données de l'utilisateur
  get currentUser() {
    return this.currentUserSubject.asObservable();
  }

  // Méthode pour enregistrer les données de connexion dans le stockage local
  saveUser(user: any) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    this.currentUserSubject.next(user); // Émettre les nouvelles données de l'utilisateur
  }

  // Méthode pour récupérer les données de connexion depuis le stockage local
  getUser() {
    return this.currentUserSubject.value;
  }

  // Méthode pour effacer les données de connexion du stockage local
  clearUser() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.currentUserSubject.next(null); // Émettre null pour indiquer qu'il n'y a pas d'utilisateur connecté
  }

  // Méthode pour vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return !!this.getUser();
  }

  // Méthode pour se déconnecter (vider les données de connexion)
  logout() {
    this.clearUser();
  }
}
