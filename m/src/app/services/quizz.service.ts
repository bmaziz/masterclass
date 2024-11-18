import { Injectable } from '@angular/core';
import { Quiz } from '../Interfaces/quizz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizzService {
  private quiz : Quiz = this.initQuizz()

  constructor() { }

  getQuiz(){
    return this.quiz;
  }

  setQuiz(q:Quiz){
    this.quiz = q;
  }

  initQuizz(){
    return {titre:"", questions:[], idQuizz:0};
  }

}
