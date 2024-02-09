import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormationService } from 'src/app/service/formation.service';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent implements OnInit{
  constructor(private router: Router,private formationService:FormationService){

}
formationData:any
  ngOnInit(): void {
    this.formationService.getAllFormationData().subscribe(
      (res)=>{
        this.formationData=res.data;
      })
  }
  deleteFormation(id:Number,index:Number){
    if(confirm("Vouler vous vrement supprimer cette formation")){
      this.formationService.deleteFormation(id).subscribe(res=>{
        this.formationData.splice(index,1)
      })
    }
  }
}
