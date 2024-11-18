import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Formation } from '../../Interfaces/formation.model';
import { getDefaultFormation } from '../../Utils/formation-utils';
import { ProgressBarComponent } from '../../Components/progress-bar/progress-bar.component';
import { FormationSubscribeCardComponent } from '../../Components/formation-subscribe-card/formation-subscribe-card.component';
import { FormationProgramComponent } from '../../Components/formation-program/formation-program.component';
import { QuizzButtonComponent } from '../../Components/quizz/quizz-button/quizz-button.component';
import { Quiz } from '../../Interfaces/quizz.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-formation',
  standalone: true,
  imports: [CommonModule, RouterModule, ProgressBarComponent, FormationSubscribeCardComponent, FormationProgramComponent, QuizzButtonComponent],
  templateUrl: './formation.component.html',
  styleUrls:['./formation.component.scss', '../formations/formations.component.scss']
})
export class FormationComponent {
  constructor(private route: ActivatedRoute,  private authService: AuthService, private http: HttpClient, private router: Router) { 
      // Souscrire aux changements d'état de connexion
      this.authSubscription = this.authService.currentUser.subscribe(user => {
        this.currentUser = user;
        this.currentUserSubscribed = this.isUserSubscribed();
      });
  }

  currentUser: any;
  authSubscription: Subscription;

    // 0 = Non, 1 = En attente , 2 = Accepté
    currentUserSubscribed:number = 0;


  isLoading : boolean = true;
  error: string = "";
  formation: Formation = getDefaultFormation();
  quizs:any=[];


  ngOnInit(): void {



    //Récupérer l'id de la formation
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.formation.idFormation = id;
      // Récupérer formation dans la base
      this.http.get<any>(`http://localhost:3000/formation/${this.formation.idFormation}`).subscribe(data => {
        if (data.message == "Détails de la formation récupérés avec succès.") {
          this.formation = data.data;
          console.log('Formation récupérée :', this.formation);
          this.isLoading = false;
          this.getQuizz();
        } else {
          this.error = data.message;
          this.isLoading = false;
        }  
      },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.error = "La formation demandée n'existe pas.";
          this.router.navigate(['/erreur']);
        } else {
          this.error = "Une erreur s'est produite lors du chargement des données de formation.";
        }
        this.isLoading = false;
      });
    });


  }


  
  ngOnDestroy() {
    // Se désabonner lors de la destruction du composant pour éviter les fuites de mémoire
    this.authSubscription.unsubscribe();
  }

  getQuizz():void{
    this.http.get<any>(`http://localhost:3000/quiz/${this.formation.idFormation}`).subscribe(data => {
      if (data.message == "Données récupérées avec succès") {
        this.quizs = data.data;
        console.log('Quizz récupérés  :', this.formation);

        this.currentUserSubscribed = this.isUserSubscribed();

      } 
    },
    (error: HttpErrorResponse) => {
      console.log("Erreur lors de la récupération des Quizz : "+ error);
    });

    
  }

  isUserSubscribed(): number {
    if (!this.currentUser) {
      return 0; // Pas connecté donc pas inscrit
    }
  
    let id = this.currentUser.idEtudiant;
    let subscriptionStatus = 0;  // Initialiser à pas inscrit
    this.formation.participants.forEach((participant) => {
      if (participant.idEtudiant == id) {
        if (participant.accepter) {
          console.log(participant);
          subscriptionStatus = 2; // Participant trouvé et accepté
        } else {
          subscriptionStatus = 1; // Participant trouvé mais en attente
        }
      }
    });
  
    return subscriptionStatus; // Retourner le statut de souscription
  }
  
}
