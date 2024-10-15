import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/service/quiz.service';

@Component({
  selector: 'app-modifier-quiz',
  templateUrl: './modifier-quiz.component.html',
  styleUrls: ['./modifier-quiz.component.css']
})
export class ModifierQuizComponent {
  ajouter: Boolean = false
  l!: number
  quiz: any
  idQuiz!: number;
  j: number = 0;
  questionForm!: FormGroup
  constructor(private route: Router, private fb: FormBuilder, private quizService: QuizService, private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.questionForm = this.fb.group({
      question: ['', Validators.required],
      idQuestion: '',
      reponses: this.fb.array([])
    });
    this.onAjouterReponse();
    this.onAjouterReponse()
    this.onAjouterReponse()
    this.onAjouterReponse()
    this.idQuiz = this.activatedRoute.snapshot.params["id"]
    this.quizService.getQuizById(this.idQuiz).subscribe(res => {
      this.quiz = res.data;
      this.l = this.quiz.length - 1;
      this.remplir(0)


    })


  }
  public get reponses() {
    return this.questionForm.get('reponses') as FormArray;
  }

  onAjouterReponse() {
    this.reponses.push(this.fb.nonNullable.group({
      reponse: ['', Validators.required],
      verite: [false],
      idReponse: "",

    }))
  }

  modifierQuestion() {
    this.quizService.putQuestion(this.quiz[this.j].idQuestion, this.questionForm.value).subscribe(res => {      
      alert("Question modifier avec succe")
      this.quiz.splice(this.j, 1, this.questionForm.value)


    })
  }
  questionSuivant() {
    
  
    this.j = this.j + 1;
    this.remplir(this.j)
  }
  questionPrecedent() {

    this.j = this.j - 1;
    this.remplir(this.j)
    this.ajouter=false
  }
  formulaireInvalide() {
    return this.questionForm.invalid ||!this.questionForm.value.reponses.find((reponse: any) => reponse.verite == true)||!this.questionForm.value.reponses.find((reponse: any) => reponse.verite == false)
  }
  remplir(i: number) {
    this.questionForm.patchValue({
      question: this.quiz[i].question,
      idQuestion: this.quiz[i].idQuestion,
      reponses: [
        { reponse: this.quiz[i].reponses[0].reponse, verite: this.quiz[i].reponses[0].verite, idReponse: this.quiz[i].reponses[0].idReponse },
        { reponse: this.quiz[i].reponses[1].reponse, verite: this.quiz[i].reponses[1].verite, idReponse: this.quiz[i].reponses[1].idReponse },
        { reponse: this.quiz[i].reponses[2].reponse, verite: this.quiz[i].reponses[2].verite, idReponse: this.quiz[i].reponses[2].idReponse },
        { reponse: this.quiz[i].reponses[3].reponse, verite: this.quiz[i].reponses[3].verite, idReponse: this.quiz[i].reponses[3].idReponse }
      ]
    })
  }
  retournerPagePrecedente() {
    window.history.back();
  }
  ouvrirAjout() {
    this.j++
    this.ajouter = true;
    this.questionForm.reset()
  }
  ajouterQuestion() {

    this.quizService.postQuestion(this.idQuiz, this.questionForm.value).subscribe(res => {
      this.ajouter = false;
      this.quizService.getQuizById(this.idQuiz).subscribe(res => {
        this.quiz = res.data;
        this.l = this.quiz.length - 1;




      })

    })
  }
}
