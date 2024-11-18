import { Component, Input } from '@angular/core';
import { Formation } from '../../Interfaces/formation.model';
import { getDefaultFormation } from '../../Utils/formation-utils';
import { CommonModule, formatDate } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { showWarningToast, showSuccessToast, showInfoToast, showErrorToast } from '../../Utils/toast-utils';

@Component({
  selector: 'app-formation-subscribe-card',
  standalone: true,
  imports: [HttpClientModule,RouterModule,CommonModule, RouterModule],
  templateUrl: './formation-subscribe-card.component.html',
  styleUrl: './formation-subscribe-card.component.scss'
})
export class FormationSubscribeCardComponent {
  @Input() formation: Formation = getDefaultFormation();
  
  currentUser: any;
  authSubscription: Subscription;
  
  // 0 = Non, 1 = En attente , 2 = Accepté
  currentUserSubscribed:number = 0;
  
  constructor(private router : Router, private http: HttpClient, private authService: AuthService, private toastr: ToastrService) {    this.currentUser = this.authService.getUser();
       // Souscrire aux changements d'état de connexion
       this.authSubscription = this.authService.currentUser.subscribe(user => {
        this.currentUser = user;
        this.currentUserSubscribed = this.isUserSubscribed();
      });
  }
  ngOnInit(){
    this.currentUserSubscribed = this.isUserSubscribed();
  }
  
  ngOnDestroy() {
    // Se désabonner lors de la destruction du composant pour éviter les fuites de mémoire
    this.authSubscription.unsubscribe();
  }
  
  formatDateToFrenchString(date: Date): string {
    const options = 'EEEE dd MMMM'; 
    return formatDate(date, options, 'fr');
}

subscribe():void{
  if(!this.authService.isLoggedIn()){
    this.router.navigate(['/login']); 
    showWarningToast("Connexion requise", "Une connexion est requise.", this.toastr);
  }else {
    if(this.currentUserSubscribed==0){
      this.http.post(`http://localhost:3000/formation/demande/${this.formation.idFormation}/${this.currentUser.idEtudiant}`, 
      {})
        .subscribe((response: any) => {
          // Demande réussie
          console.log(response);
          this.currentUserSubscribed = 1;
          showInfoToast("Inscription en attente", "Un admin doit approuver votre demande", this.toastr);
  
        }, (error) => {
          console.error("Erreur lors de la requête à l'API :", error);
          showErrorToast("Une erreur est survenue",error.error, this.toastr);
  
        });
    }else if(this.currentUserSubscribed==1){
      showInfoToast("Inscription déjà en attente", "Un admin doit approuver votre demande", this.toastr);
    }else {
      showInfoToast("Vous êtes déjà inscrit", "Vous êtes déjà inscrit à cette formation.", this.toastr);

    }
   
  }
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

