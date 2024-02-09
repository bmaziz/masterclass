import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormateurService } from 'src/app/service/formateur.service';

@Component({
  selector: 'app-formateur',
  templateUrl: './formateur.component.html',
  styleUrls: ['./formateur.component.css']
})
export class FormateurComponent implements OnInit{
  constructor(private router: Router,private formateurService:FormateurService){

  }
  formateurData:any;
  ngOnInit(): void {
    this.formateurService.getAllFormateurData().subscribe(res=>{
      this.formateurData=res.data
    })
  }
  deleteFormateur(id:Number,index:Number){
    if(confirm("Vouler vous vrement supprimer ce formateur")){
      this.formateurService.deleteFormateur(id).subscribe(res=>{
      this.formateurData.splice(index,1)
      })
    }
  }
}
