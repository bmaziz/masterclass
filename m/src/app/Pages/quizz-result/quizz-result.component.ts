import { Component } from '@angular/core';
import { Answer, Quiz } from '../../Interfaces/quizz.model';
import { QuizzService } from '../../services/quizz.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-quizz-result',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './quizz-result.component.html',
  styleUrl: './quizz-result.component.scss'
})
export class QuizzResultComponent {
  currentUser: any;
  authSubscription: Subscription;

  constructor(private quizzService : QuizzService, private router:Router, private authService:AuthService, private http:HttpClient){
      // Souscrire aux changements d'état de connexion
  this.authSubscription = this.authService.currentUser.subscribe(user => {
    this.currentUser = user;
  });
};

ngOnDestroy() {
  // Se désabonner lors de la destruction du composant pour éviter les fuites de mémoire
  this.authSubscription.unsubscribe();
}

  quiz : Quiz = this.quizzService.initQuizz();
  

  ngOnInit(){
    this.quiz = this.quizzService.getQuiz();
    console.log(this.quiz);

    if(this.quiz.questions.length == 0){
      this.router.navigate(['/quizz/24']);
    }
    this.quiz.score = this.calculateScore();
    this.saveResult(this.quiz.score);
  }

  isAnswerCorrect(answer : Answer): boolean {
    return answer.verite === 1 && (answer.cocher === true );
  }

  isAnswerIncorrect(answer : Answer): boolean {
    return answer.verite !== 1 && answer.cocher === true;
  }

  isAnswerMissed(answer: Answer) :boolean {
    return answer.verite == 1 && ( !answer.cocher )  ;
  }

  calculateScore(): number {
    let totalScore = 0;
  
    // Parcourir chaque question du quizz
    for (let question of this.quiz.questions) {
      let correctAnswersCount = 0;
      let userCorrectAnswersCount = 0;
      let userIncorrectAnswersCount = 0;
  
      // Compter le nombre total de bonnes réponses pour la question
      correctAnswersCount = question.reponses.filter(answer => answer.verite === 1).length;
  
      // Compter les bonnes réponses données par l'utilisateur
      userCorrectAnswersCount = question.reponses.filter(answer => this.isAnswerCorrect(answer)).length;
  
      // Compter les mauvaises réponses données par l'utilisateur
      userIncorrectAnswersCount = question.reponses.filter(answer => this.isAnswerIncorrect(answer)).length;
  
      // Calculer le score pour la question
      let questionScore = 0;
      if (userCorrectAnswersCount === correctAnswersCount && userIncorrectAnswersCount === 0) {
        // Si l'utilisateur a coché toutes les bonnes réponses sans erreur
        questionScore = 1; // Score complet
      } else if (userCorrectAnswersCount === 0 && userIncorrectAnswersCount > 0) {
        // Si l'utilisateur n'a coché aucune bonne réponse mais a coché au moins une mauvaise réponse
        questionScore = 0; // Score nul
      } else {
        // Si l'utilisateur a coché des réponses partiellement correctes et/ou incorrectes
        let correctFraction = userCorrectAnswersCount / correctAnswersCount;
        let incorrectFraction = userIncorrectAnswersCount / (question.reponses.length - correctAnswersCount);
  
        // Calculer le score en soustrayant le poids des réponses incorrectes du poids des réponses correctes
        questionScore = Math.max(0, correctFraction - incorrectFraction);
      }
  
      // Arrondir le score à un chiffre après la virgule
      questionScore = parseFloat(questionScore.toFixed(1));
  
      // Mettre à jour la variable score de la question
      question.score = questionScore;
  
      // Ajouter le score de la question au score total
      totalScore += questionScore;
    }
  
    // Convertir le score total à une échelle de 100
    totalScore = (totalScore / this.quiz.questions.length) * 100;
  
    return totalScore;
  }

  saveResult(note:number){
      this.http.post<any>(`http://localhost:3000/quiz/note/${this.quiz.idQuizz}/${this.currentUser.idEtudiant}`,
      {
        "note":note
      }
      )
        .subscribe(
          response => {
            console.log(response);
          },
          error => {
            console.error( error);
          }
        );
    
  }
  

  



}
