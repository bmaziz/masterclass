import { Component, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { NgForm, FormControl, ReactiveFormsModule, Form } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { showSuccessToast } from '../../Utils/toast-utils';

@Component({
  selector: 'app-login-card',
  standalone: true,
  imports:[HttpClientModule, CommonModule, MdbFormsModule, ReactiveFormsModule, RouterLink, RouterModule],
  templateUrl: './login-card.component.html',
  styleUrl: './login-card.component.scss'
})
export class LoginCardComponent {
  email = new FormControl('');
  password= new FormControl('');
  errorMessage : string = "";
  constructor(private router : Router, private http: HttpClient, private authService: AuthService, private toastr: ToastrService) {}

  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/']); 
    }
  }



  connexion() {
    // Validation de l'adresse e-mail
    const emailValue = this.email.value;
    if (!emailValue || !this.validateEmail(emailValue)) {
      this.errorMessage = "Adresse e-mail invalide";
      return;
    }

 
    // Requête à l'API
    const passwordValue = this.password.value || '';
    this.http.get(`http://localhost:3000/etudiant/connexion/${emailValue}/${passwordValue}`)
      .subscribe((response: any) => {
        //Connexion réussie
        console.log(response);
        this.authService.saveUser(response.data[0]);
        this.errorMessage="";
        showSuccessToast('Connexion réussie!',`Bienvenue ${response.data[0].prenom}`,this.toastr);
        this.router.navigate(['/']); 



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

  
}