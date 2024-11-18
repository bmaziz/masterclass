import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-quizz-button',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './quizz-button.component.html',
  styleUrl: './quizz-button.component.scss'
})
export class QuizzButtonComponent {
  @Input() titre :string="";
  @Input() id :number=0;
  @Input() numero:number=0;

  constructor(private router: Router) {}

  }

