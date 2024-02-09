import { Component, OnInit } from '@angular/core';
import { FormateurService } from 'src/app/service/formateur.service';
import { FormationService } from 'src/app/service/formation.service';

@Component({
  selector: 'app-demande-formation',
  templateUrl: './demande-formation.component.html',
  styleUrls: ['./demande-formation.component.css']
})
export class DemandeFormationComponent implements OnInit{
  listeDemande:any;
  constructor(private formationService:FormationService){}
  ngOnInit(): void {
    this.formationService.getDemande().subscribe(res=>{
      this.listeDemande=res.data;
      console.log(this.listeDemande);
      
    })
  }
  accepterDemande(idFormation:number,idEtudiant:number,i:number){
    if (confirm("Vouler vous vrement accepter cette demande")) {
      this.formationService.accepterDemande(idFormation,idEtudiant).subscribe(res=>{
        alert("Demande accepter");
        this.listeDemande.splice(i,1);
      })
    }
  }
  refuserDemande(idFormation:number,idEtudiant:number,i:number){
    if (confirm("Vouler vous vrement refuser cette demande")) {
      this.formationService.refuserDemande(idFormation,idEtudiant).subscribe(res=>{
        alert("Demande refuser");
        this.listeDemande.splice(i,1);
      })
    }
  }
}
