import { Component } from '@angular/core';
import { Quiz } from '../../Interfaces/quizz.model';
import { QuizzService } from '../../services/quizz.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quizz-question',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizz-question.component.html',
  styleUrl: './quizz-question.component.scss'
})
export class QuizzQuestionComponent {

  constructor(private quizzService : QuizzService, private router:Router){};

  quiz : Quiz = this.quizzService.initQuizz();
  currentQuestion : number = 0;


  ngOnInit(){
    this.quiz = this.quizzService.getQuiz();
    console.log(this.quiz);

    if(this.quiz.questions.length == 0){
      this.router.navigate(['/']);
    }
  }

  cocherReponse(idReponse:number):void{
    this.quiz.questions[this.currentQuestion].reponses.forEach(reponse => {
      if(reponse.idReponse==idReponse){
        reponse.cocher = true;
      }
   }); 
  }

  decocherReponse(idReponse:number):void{
    this.quiz.questions[this.currentQuestion].reponses.forEach(reponse => {
      if(reponse.idReponse==idReponse){
        reponse.cocher = false;
      }
   }); 
  }

  nextQuestion():void{
    if(this.currentQuestion < this.quiz.questions.length - 1)
    this.currentQuestion++;
  }

  
  previousQuestion():void{
    if(this.currentQuestion>0)
    this.currentQuestion--;
  }


  validerReponses():void{
    // Envoyer requête pour sauvegarder

    this.router.navigate(['/results']);

    this.quizzService.setQuiz(this.quiz);
  }



}