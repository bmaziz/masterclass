import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormationService } from 'src/app/service/formation.service';
import { QuizService } from 'src/app/service/quiz.service';

@Component({
  selector: 'app-detail-formation',
  templateUrl: './detail-formation.component.html',
  styleUrls: ['./detail-formation.component.css']
})
export class DetailFormationComponent implements OnInit {
  formationData: any;
  listeQuiz: any;
  idFormation!: number;
  constructor(private formationService: FormationService, private quizService: QuizService, private route: Router, private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.idFormation = this.activatedRoute.snapshot.params["id"];
    this.quizService.getQuiz(this.idFormation).subscribe(res => {
      console.log(res.data);

      this.listeQuiz = res.data;
    })
    this.formationService.getFormationById(this.idFormation).subscribe(res => {
      this.formationData = res.data;
      console.log(res);

    })
  }
  deleteFormation() {
    if (confirm("Vouler vous vrement supprimer cette formation")) {
      this.formationService.deleteFormation(this.idFormation).subscribe(res => {
        this.route.navigate(['/admin/formation'])
      })
    }
  }
  deleteQuiz(idQuiz: number, index: number) {
    if (confirm("Vouler vous vrement supprimer cette quiz")) {
      this.quizService.deleteQuiz(idQuiz).subscribe(res => {
        this.listeQuiz.splice(index, 1)
        
      })
    }

  }
  deleteEtudiant(idEtudiant:number,i:number){
    if(confirm("Voulez vous vrément effacer cette etudiant")){
      this.formationService.refuserDemande(this.idFormation,idEtudiant).subscribe(res=>{
        alert("Etudiant supprimer de la formation");
        this.formationData.participants.splice(i,1)
      })
    }
    
  }
}
