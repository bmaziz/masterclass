import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-formation-card-2',
  standalone: true,
  imports:[CommonModule, RouterModule],
  templateUrl: './formation-card-2.component.html',
  styleUrls: ['./formation-card-2.component.scss']
})
export class FormationCard2Component {
  constructor(private router: Router) {}

  @Input() id:string = "";
  @Input() titre: string = "";
  @Input() description: string = "";
  @Input() image: string = "";

  
  redirectToDetails() {
    // Remplacez 'details' par la route vers laquelle vous voulez rediriger
    this.router.navigate(['/formation/'+this.id]); 
  }

}
