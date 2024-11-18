import { CommonModule, formatDate } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-formation-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './my-formation-card.component.html',
  styleUrl: './my-formation-card.component.scss'
})
export class MyFormationCardComponent {
  @Input() formation : any;
  isButtonHovered: boolean = false;
  constructor(private router: Router) {}

  activateHover() {
    this.isButtonHovered = true;
  }

  formatDateToFrenchString(date: Date): string {
    const options = 'EEEE dd MMMM'; 
    return formatDate(date, options, 'fr');
}

  
redirectToDetails() {
  // Remplacez 'details' par la route vers laquelle vous voulez rediriger
  this.router.navigate(['/formation/'+this.formation.idFormation]); 
}


}
