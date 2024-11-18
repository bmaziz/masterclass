import { Component, ElementRef, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { NgForm, FormControl, ReactiveFormsModule, Form } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { MyFormationCardComponent } from '../../Components/my-formation-card/my-formation-card.component';

@Component({
  selector: 'app-mes-formations',
  standalone: true,
  imports:[ MyFormationCardComponent,HttpClientModule, CommonModule, MdbFormsModule, ReactiveFormsModule, RouterLink, RouterModule],
  templateUrl: './mes-formations.component.html',
  styleUrl: './mes-formations.component.scss'
})
export class MesFormationsComponent {

  currentUser: any;
  authSubscription: Subscription;


  
  isLoading : boolean = true;
  error: string = "";
  formations: any[] = [];



  constructor(private router : Router, private http: HttpClient,
     private authService: AuthService, private toastr: ToastrService,
     private elementRef: ElementRef

     ) {
    this.currentUser = this.authService.getUser();

    // Souscrire aux changements d'état de connexion
    this.authSubscription = this.authService.currentUser.subscribe(user => {
    this.currentUser = user;
    if(!user){
      this.router.navigate(['/']); 
    }
  });
  }

    
  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
  

  ngOnInit(): void {
    // Rediriger a la page d'accueil si pas connecté
    if(!this.authService.isLoggedIn()){
      this.router.navigate(['/']); 
    }
    else {
       //Récupérer l'id du user si connecté
        const user_id = this.currentUser.idEtudiant;
        // Récupérer ses formations dans la base

        this.http.get<any>(`http://localhost:3000/etudiant/formation/${user_id}`).subscribe(data => {
          if (data.message == "Formations de l'étudiant récupérées avec succès.") {
            this.formations = data.data;
            console.log('Formation récupérée :', this.formations);
            this.isLoading = false;
          } else {
            this.error = data.message;
            this.isLoading = false;
          }  
        },
        (error: HttpErrorResponse) => {
          if (error.status === 404) {
            this.error = "Vous n'avez encore aucune formation.";
            this.router.navigate(['/erreur']);
          } else {
            this.error = "Une erreur s'est produite lors du chargement des données..";
          }
          this.isLoading = false;
        });
    
  }

  }

  ngAfterViewInit(): void {
    // Appliquer l'effet JavaScript après le chargement du DOM
    const titleElement = this.elementRef.nativeElement.querySelector('.title');

    if (titleElement) {
      document.addEventListener('mousemove', (e : any) => {
        const mouseX = e.pageX;
        const mouseY = e.pageY;
        const traX = ((4 * mouseX) / 570) + 40;
        const traY = ((4 * mouseY) / 570) + 50;
        titleElement.style.backgroundPosition = `${traX}% ${traY}%`;
      });
    }
  }

}
