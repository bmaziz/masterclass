import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-erreur',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './erreur.component.html',
  styleUrl: './erreur.component.scss'
})
export class ErreurComponent {

}
