import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormateurService } from 'src/app/service/formateur.service';
import { FormationService } from 'src/app/service/formation.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ajouter-formation',
  templateUrl: './ajouter-formation.component.html',
  styleUrls: ['./ajouter-formation.component.css']
})
export class AjouterFormationComponent implements OnInit {
  formationForm!: FormGroup;
  formateurs: any;
  constructor(private router: Router, private fb: FormBuilder, private formateurService: FormateurService, private formationService: FormationService) { }
  ngOnInit(): void {
    this.formateurService.getAllFormateurData().subscribe((res) => {
      this.formateurs = res.data
    })
    this.formationForm = this.fb.nonNullable.group({
      titre: ['', Validators.required],
      prix: ['', Validators.required],
      totalmois: ['', Validators.required],
      totalheure: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      dateDebut: ['', Validators.required],
      icone: ['', Validators.required],
      apropos: ['', Validators.required],
      idFormateur: ['', Validators.required],
      programme: this.fb.array([]),


    })
    this.onAjouterProgramme()
  }

  ajouterFormation() {
    console.log(this.formationForm.value);

    this.formationService.postFormation(this.formationForm.value).subscribe(res => {
      alert("Formation Ajouter")
      this.router.navigate(['/admin/formation']);
    })
  }
  public get programme() {
    return this.formationForm.get('programme') as FormArray;
  }
  public getContenu(i: number) {
    const programmeControl = this.programme.at(i) as FormGroup;
    const contenusArray = programmeControl.get('contenus') as FormArray;
    return contenusArray
  }
  onAjouterProgramme() {
    this.programme.push(this.fb.nonNullable.group({
      titre: ['', Validators.required],
      contenus: this.fb.array([this.fb.group({
        contenu: ["", Validators.required]
      })]),
    }))

  }
  onSupprimerProgramme(i: number) {
    this.programme.removeAt(i)
  }
  onAjouterContenu(i: number) {

    const contenusArray = this.getContenu(i)
    contenusArray.push(this.fb.group({
      contenu: ["", Validators.required]
    }));
  }
  onSupprimerContenu(i: number, j: number) {
    this.getContenu(i).removeAt(j)
  }

}
