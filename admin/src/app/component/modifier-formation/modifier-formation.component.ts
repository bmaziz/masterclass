
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormateurService } from 'src/app/service/formateur.service';
import { FormationService } from 'src/app/service/formation.service';
import { DatePipe, } from '@angular/common'; // Importez DatePipe ici


@Component({
  selector: 'app-modifier-formation',
  templateUrl: './modifier-formation.component.html',
  styleUrls: ['./modifier-formation.component.css'],
  providers: [DatePipe],
  

})
export class ModifierFormationComponent implements OnInit{
  formationForm!: FormGroup;
  id!: number
  formateurs: any;
  constructor(private activateRoute: ActivatedRoute, private router: Router, private fb: FormBuilder, private formateurService: FormateurService, private formationService: FormationService,private datePipe: DatePipe) { }
  ngOnInit(): void {
    this.formationForm = this.fb.group({
      titre:['', Validators.required],
      prix: ['', Validators.required],
      totalmois: ['', Validators.required],
      totalheure: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      dateDebut: ['', Validators.required],
      icone: ['', Validators.required],
      apropos: ['', Validators.required],
      idFormateur: ['', Validators.required],

    })
    this.id = this.activateRoute.snapshot.params["id"]
    
    this.formateurService.getAllFormateurData().subscribe((res) => {
      this.formateurs = res.data
    })
    this.formationService.getFormationById(this.id).subscribe(res=>{
      console.log(res.data);
      
      const dateDebutFormatted = this.datePipe.transform(res.data.dateDebut, 'yyyy-MM-dd');

      this.formationForm.patchValue({
        titre:res.data.titre,
        prix: res.data.prix,
        totalmois: res.data.totalmois,
        totalheure: res.data.totalheure,
        description: res.data.description,
        image: res.data.image,
        dateDebut: dateDebutFormatted,
        icone: res.data.icone,
        apropos:res.data.apropos,
        idFormateur: res.data.idFormateur
  
      })

      console.log("dataaa",this.formationForm.value)
    })
    
  }
  updateFormation(){
    this.formationService.updateFormation(this.id,this.formationForm.value).subscribe(res=>{
      alert("formation modifier avec succee");
      window.history.back();
    })
  }
  retournerPagePrecedente() {
    window.history.back();
  }
}
