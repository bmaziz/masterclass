import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feedback-card',
  standalone: true,
  imports: [],
  templateUrl: './feedback-card.component.html',
  styleUrl: './feedback-card.component.scss'
})
export class FeedbackCardComponent {
  @Input() prenom:string = '';
  @Input() review:string = '';
  @Input() picture:string='';
}
