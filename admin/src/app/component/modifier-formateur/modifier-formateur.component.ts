import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormateurService } from 'src/app/service/formateur.service';
import { FormationService } from 'src/app/service/formation.service';

@Component({
  selector: 'app-modifier-formateur',
  templateUrl: './modifier-formateur.component.html',
  styleUrls: ['./modifier-formateur.component.css']
})
export class ModifierFormateurComponent implements OnInit {
  formateurForm!: FormGroup;
  id!: Number
  constructor(private activateRoute: ActivatedRoute, private router: Router, private fb: FormBuilder, private formateurService: FormateurService, private formationService: FormationService) { }
  ngOnInit(): void {
    this.formateurForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      numTel: ['', Validators.required],
      email: ['', Validators.required],


    })
    this.id = this.activateRoute.snapshot.params["id"]

    this.formateurService.getFormateurById(this.id).subscribe(res => {
      console.log(res);

      this.formateurForm.patchValue({
        nom: res.data.nom,
        prenom: res.data.prenom,
        numTel: res.data.numTel,
        email: res.data.email,

      })
    })

  }
  updateFormateur(){
    
    this.formateurService.updateFormateur(this.id,this.formateurForm.value).subscribe(res=>{
      alert("Formateur modifier");
      this.router.navigate(['/admin/formateur'])
    })
  }
}



