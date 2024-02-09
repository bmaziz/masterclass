import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/service/quiz.service';

@Component({
  selector: 'app-creer-quiz',
  templateUrl: './creer-quiz.component.html',
  styleUrls: ['./creer-quiz.component.css']
})
export class CreerQuizComponent implements OnInit {
  quiz: any[] = []
  idFormation!: number;
  j: number = 1;
  questionForm!: FormGroup
  constructor(private route: Router, private fb: FormBuilder, private quizService: QuizService, private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.idFormation = this.activatedRoute.snapshot.params["id"]
    this.questionForm = this.fb.group({
      question: ['', Validators.required],
      reponses: this.fb.array([])
    });
    this.onAjouterReponse();
    this.onAjouterReponse()
    this.onAjouterReponse()
    this.onAjouterReponse()

  }
  public get reponses() {
    return this.questionForm.get('reponses') as FormArray;
  }

  ajouterQuiz() {
    this.quiz.push(this.questionForm.value)
    this.quizService.postQuiz(this.idFormation, this.quiz).subscribe(res => {
      
      alert("quiz ajouter");
      this.route.navigate(["/formation"])
    })
  }
  onAjouterReponse() {
    this.reponses.push(this.fb.nonNullable.group({
      reponse: ['', Validators.required],
      verite: [false]

    }))
  }


  questionSuivant() {
    this.quiz.push(this.questionForm.value);
    console.log(this.quiz);
    this.j = this.j + 1;
    this.questionForm.reset()
  }

  formulaireInvalide(){
    return this.questionForm.invalid
  }
}


