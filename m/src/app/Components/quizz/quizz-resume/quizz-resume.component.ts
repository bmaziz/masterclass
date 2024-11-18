import { Component, Input } from '@angular/core';
import { Quiz } from '../../../Interfaces/quizz.model';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-quizz-resume',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizz-resume.component.html',
  styleUrl: './quizz-resume.component.scss'
})
export class QuizzResumeComponent {
 @Input() quizz: Quiz = { idQuizz:0, questions : []};
 quizAttempts: QuizAttempt[] = []

 currentUser: any;
 authSubscription: Subscription;


 
 constructor(private router : Router, private http: HttpClient, private authService: AuthService) {    this.currentUser = this.authService.getUser();
  // Souscrire aux changements d'état de connexion
  this.authSubscription = this.authService.currentUser.subscribe(user => {
   this.currentUser = user;
 });

}

ngOnDestroy() {
  // Se désabonner lors de la destruction du composant pour éviter les fuites de mémoire
  this.authSubscription.unsubscribe();
}

ngOnInit(){
  this.getQuizzAttemps();
  this.quizAttempts 
}

getQuizzAttemps(): void {
  this.http.get<any>(`http://localhost:3000/quiz/note/${this.quizz.idQuizz}/${this.currentUser.idEtudiant}`)
    .subscribe(
      response => {
        console.log(response);
        this.quizAttempts = response.data;
      },
      error => {
        console.error( error);
      }
    );
}
}


interface QuizAttempt {
  date: Date;
  note: number;
}