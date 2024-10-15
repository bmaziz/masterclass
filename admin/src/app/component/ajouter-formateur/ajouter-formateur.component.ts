import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormateurService } from 'src/app/service/formateur.service';

@Component({
  selector: 'app-ajouter-formateur',
  templateUrl: './ajouter-formateur.component.html',
  styleUrls: ['./ajouter-formateur.component.css']
})
export class AjouterFormateurComponent {
  formateurForm!:FormGroup ;
  constructor(private router:Router,private fb:FormBuilder,private formateurService:FormateurService){}
  ngOnInit(): void {
    
    this.formateurForm=this.fb.nonNullable.group({
      nom:['',Validators.required],
      prenom:['',Validators.required],
      numTel:['',Validators.required],
      email:['',Validators.required],
    
    })
  }
  ajouterFormateur(){
    
    this.formateurService.postFormateur(this.formateurForm.value).subscribe(res=>{
      alert("Formateur Ajouter")
      this.router.navigate(['/admin/formateur']); 
    })
  }

}
