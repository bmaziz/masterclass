import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Formation } from '../../Interfaces/formation.model';
import { getDefaultFormation } from '../../Utils/formation-utils';

@Component({
  selector: 'app-formation-card-1',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './formation-card-1.component.html',
  styleUrl: './formation-card-1.component.scss'
})
export class FormationCard1Component {
  constructor(private router: Router) {}

  @Input() formation:Formation = getDefaultFormation();

  redirectToDetails() {
    // Remplacez 'details' par la route vers laquelle vous voulez rediriger
    this.router.navigate(['/formation/'+this.formation.idFormation]); 
  }
}
