import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { QuizzButtonComponent } from '../../Components/quizz/quizz-button/quizz-button.component';
import { Quiz } from '../../Interfaces/quizz.model';
import { QuizzResumeComponent } from '../../Components/quizz/quizz-resume/quizz-resume.component';
import { QuizzService } from '../../services/quizz.service';

@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [CommonModule, RouterModule , QuizzButtonComponent, QuizzResumeComponent],
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.scss','../formations/formations.component.scss']
})
export class QuizzComponent {
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private quizzService: QuizzService) { }

  isLoading : boolean = true;
  error: string = "";
  quizz: Quiz = { idQuizz:0, questions : []};



  ngOnInit(): void {
    //Récupérer l'id de la formation
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.quizz.idQuizz = id;
      // Récupérer quizz dans la base
      this.http.get<any>(`http://localhost:3000/quiz/question/${id}`).subscribe(data => {
        if (data.message == "Questions et réponses récupérées avec succès.") {
          this.quizz.questions = data.data;
          console.log('Quizz récupérée :', this.quizz);
          this.isLoading = false;          

          this.quizzService.setQuiz(this.quizz);

        } else {
          this.error = data.message;
          this.isLoading = false;
        }  
      },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.error = "Le quizz demandé n'existe pas.";
          // this.router.navigate(['/erreur']);
        } else {
          this.error = "Une erreur s'est produite lors du chargement des données du quizz.";
        }
        this.isLoading = false;
      });
    });


  }
}
