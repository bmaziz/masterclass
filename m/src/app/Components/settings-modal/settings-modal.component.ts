import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings-modal.component.html',
  styleUrl: './settings-modal.component.scss'
})
export class SettingsModalComponent {
  currentUser: any;
  authSubscription: Subscription;
  modifyingField: string  = "";

  oldPassword: string = '';
  newPassword: string = '';

  error:string = '';
  passwordError:string = '';



  constructor(private router : Router, private http: HttpClient, private authService: AuthService, private toastr: ToastrService, public modalRef: MdbModalRef<SettingsModalComponent>) {    this.currentUser = this.authService.getUser();
    // Souscrire aux changements d'état de connexion
    this.authSubscription = this.authService.currentUser.subscribe(user => {
     this.currentUser = user;
   });
}

ngOnInit(){
}
ngOnDestroy() {
  // Se désabonner lors de la destruction du composant pour éviter les fuites de mémoire
  this.authSubscription.unsubscribe();
}


isPasswordValid(): boolean {
  return this.newPassword !='' && this.oldPassword !== '';
}



isModifying(field: string): boolean {
  return this.modifyingField === field;
}

setModifying(field: string): void {
  this.modifyingField = field;
}




updateEmail(){
  if (!this.currentUser.email || !this.validateEmail(this.currentUser.email)) {
    this.error = "Adresse e-mail invalide";
  }else {
    this.error ="";
    this.updateUser();
  }
}

  validateEmail(email: string): boolean {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }


confirmDelete(): void {
  const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ?");
  if (confirmDelete) {
    this.http.delete<any>(`http://localhost:3000/etudiant/${this.currentUser.idEtudiant}`)
    .subscribe(
      response => {
        this.toastr.success('Compte supprimé avec succès.', 'Succès');
        this.authService.logout();
        this.router.navigate(['/']); 
        this.modalRef.close();
      },
      error => {
        console.error("Erreur lors de la supression du compte :", error);
        this.toastr.error('Une erreur s\'est produite lors de la suppression du compte.', 'Erreur');
      }
    );
   
  }
}

updateUser(): void {
  console.log("User modifié :" , this.currentUser);
  this.setModifying("");

  this.http.put<any>(`http://localhost:3000/etudiant/${this.currentUser.idEtudiant}`, this.currentUser)
    .subscribe(
      response => {
        this.toastr.success('Vos informations ont été mises à jour avec succès.', 'Succès');
        console.log("Données utilisateur mises à jour :", response);
        this.authService.saveUser(this.currentUser);
        // Peut-être rediriger l'utilisateur ou effectuer d'autres actions après la mise à jour
      },
      error => {
        console.error("Erreur lors de la mise à jour des informations utilisateur :", error);
        this.toastr.error('Une erreur s\'est produite lors de la mise à jour de vos informations.', 'Erreur');
      }
    );
}


updatePassword(): void {
  console.log("Nouveau mot de passe :", this.newPassword);

  
  this.http.put<any>(`http://localhost:3000/etudiant/changerMotDePasse/${this.currentUser.idEtudiant}`, 
  {
    "ancienMotDePasse":this.oldPassword,
    "nouveauMotDePasse":this.newPassword
  })
    .subscribe(
      response => {
        this.passwordError = "";
        this.toastr.success('Mot de passe mis à jour.', 'Succès');
        console.log("Mot de passe mis à jour :", response);
        this.newPassword="";
        this.oldPassword="";
      },
      error => {
        this.passwordError = error.error.message;
        console.error("Erreur lors de la mise à jour du mot de passe :", error);
      }
    );
}

updateProfilPic():void{
  //Mettre a jour photo de profil
  this.http.put<any>(`http://localhost:3000/etudiant/${this.currentUser.idEtudiant}`, this.currentUser)
    .subscribe(
      response => {
        this.toastr.success("L'image a été mises à jour avec succès.", 'Succès');
        console.log("Données utilisateur mises à jour :", response);
        this.authService.saveUser(this.currentUser);
        // Peut-être rediriger l'utilisateur ou effectuer d'autres actions après la mise à jour
      },
      error => {
        console.error("Erreur lors de la mise à jour des informations utilisateur :", error);
        this.toastr.error('Une erreur s\'est produite lors de la mise à jour de vos informations.', 'Erreur');
      }
    );
}
}
