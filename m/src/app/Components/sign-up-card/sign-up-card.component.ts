import { Component, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { NgForm, FormControl, ReactiveFormsModule, Form } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sign-up-card',
  standalone: true,
  imports:[HttpClientModule, CommonModule, 
    MdbFormsModule, ReactiveFormsModule, RouterLink,
    RouterModule
  ],
  templateUrl: './sign-up-card.component.html',
  styleUrl: './sign-up-card.component.scss'
})
export class SignUpCardComponent {
  email = new FormControl('');
  password= new FormControl('');
  numTel= new FormControl();
  nom = new FormControl("");
  prenom = new FormControl("");

  errorMessage : string = "";

  constructor(private router : Router,private http: HttpClient, private authService: AuthService, private toastr: ToastrService) {}

 
  signup() {
    // Effacer les messages d'erreur précédents
    this.errorMessage = "";

    // Validation des champs
    if (!this.nom.value || !this.prenom.value || !this.numTel.value || !this.password.value) {
      this.errorMessage = "Veuillez remplir tous les champs.";
      return;
    }
    if (this.nom.value.length < 2 || this.prenom.value.length < 2 || this.password.value.length < 2) {
      this.errorMessage = "Le prénom et le nom doivent contenir au moins 2 caractères.";
      return;
    }

    if (this.password.value.length < 3) {
      this.errorMessage = "Le mot de passe doit contenir au moins 3 caractères.";
      return;
    }
    // Validation de l'adresse e-mail
    const emailValue = this.email.value;
    if (!emailValue || !this.validateEmail(emailValue)) {
      this.errorMessage = "Adresse e-mail invalide";
      return;
    }

    // Requête à l'API
    const passwordValue = this.password.value || '';
    this.http.post(`http://localhost:3000/etudiant`, 
    {
      "nom":this.nom.value,
      "prenom":this.prenom.value,
      "numTel":this.numTel.value,
      "email":this.email.value,
      "password":this.password.value
    })
      .subscribe((response: any) => {
        //Connexion réussie
        console.log(response);
        this.authService.saveUser(response.user);
        this.errorMessage="";
        this.showToast('Compte créé avec succès !',`Vous pouvez maintenant vous connecter.`);
        this.router.navigate(['/login']); 

      }, (error) => {
        console.error("Erreur lors de la requête à l'API :", error);
        // Gérer les erreurs ici
        this.errorMessage = error.error.message;
        console.log(this.errorMessage)
      });
  }

  // Fonction de validation d'adresse e-mail simple
  validateEmail(email: string): boolean {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  showToast(title:string, subtitle:string) :void {
    this.toastr.success(subtitle, title, {
      tapToDismiss:true,
      closeButton:true,
      progressBar:true,
      timeOut:5000,
      positionClass: 'toast-bottom-right',
      newestOnTop:true,
    });
  }
}
