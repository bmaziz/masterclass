import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/service/quiz.service';

@Component({
  selector: 'app-note-quiz',
  templateUrl: './note-quiz.component.html',
  styleUrls: ['./note-quiz.component.css']
})
export class NoteQuizComponent implements OnInit{
  notesQuiz:any;
  idQuiz!:number
  constructor(private router:Router,private quizService:QuizService,private activatedRoute:ActivatedRoute){}
  ngOnInit(): void {
    this.idQuiz=this.activatedRoute.snapshot.params["idQuiz"]
    this.quizService.getNoteQuiz(this.idQuiz).subscribe(res=>{
      this.notesQuiz=res.data;
      
    })
  }

}
