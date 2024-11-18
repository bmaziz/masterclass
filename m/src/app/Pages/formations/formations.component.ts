import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormationCard2Component } from '../../Components/formation-card-2/formation-card-2.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

interface Formation {
  titre: string;
  image: string;
  description: string;
  idFormation:string;
}

@Component({
  selector: 'app-formations',
  standalone: true,
  imports: [CommonModule, FormationCard2Component],
  templateUrl: './formations.component.html',
  styleUrl: './formations.component.scss'
})
export class FormationsComponent {  

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  formations: Formation[] = [];
  isLoading : boolean = true;
  error: string = "";

  ngOnInit(): void {

      this.http.get<any>(`http://localhost:3000/formation/`).subscribe(data => {
        if (data.message == "Données de formation récupérées avec succès."        ) {
          this.formations = data.data;
          this.isLoading = false;
        } else {
          this.error = data.message;
          this.isLoading = false;
        }  
      },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.error = "La formation demandée n'existe pas.";
          this.router.navigate(['/erreur']);
        } else {
          this.error = "Une erreur s'est produite lors du chargement des données de formation.";
        }
        this.isLoading = false;
      });
  
  }
}
