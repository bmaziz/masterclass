import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-overview-card',
  standalone: true,
  imports: [],
  templateUrl: './overview-card.component.html',
  styleUrl: './overview-card.component.scss',
  animations: [
    trigger('increment', [
      state('start', style({ opacity: 0, transform: 'translateY(-20px)' })),
      transition('start => end', [
        animate('1s ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],

})
export class OverviewCardComponent {
  nombreEtudiantsInscrits: number = 0;
  nombreFormations: number = 0;
  nombreFormateur: number = 0;
  anneesExperiences : number = 11;

  
  
  constructor(private http: HttpClient) {}


  
  ngOnInit() {
    this.http.get<any>('http://localhost:3000/overview').subscribe(data => {
      this.nombreEtudiantsInscrits = data.nombre_etudiants_inscrits;
      this.nombreFormations = data.nombre_formations;
      this.nombreFormateur = data.nombre_formateur;
    });
  }
}
