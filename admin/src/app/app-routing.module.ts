import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormationComponent } from './component/formation/formation.component';
import { DetailFormationComponent } from './component/detail-formation/detail-formation.component';
import { ErrorComponent } from './component/error/error.component';
import { FormateurComponent } from './component/formateur/formateur.component';
import { AjouterFormateurComponent } from './component/ajouter-formateur/ajouter-formateur.component';
import { AjouterFormationComponent } from './component/ajouter-formation/ajouter-formation.component';
import { ModifierFormationComponent } from './component/modifier-formation/modifier-formation.component';
import { ModifierFormateurComponent } from './component/modifier-formateur/modifier-formateur.component';
import { CreerQuizComponent } from './component/creer-quiz/creer-quiz.component';
import { ModifierQuizComponent } from './component/modifier-quiz/modifier-quiz.component';
import { DemandeFormationComponent } from './component/demande-formation/demande-formation.component';

const routes: Routes = [
  {path:'formation',component:FormationComponent},
  {path:'ajouterFormation',component:AjouterFormationComponent},
  {path:'demandeInscription',component:DemandeFormationComponent},
  {path:'formation/:id',component:DetailFormationComponent},
  {path:'modifierFormation/:id',component:ModifierFormationComponent},
  {path:'modifierFormateur/:id',component:ModifierFormateurComponent},
  {path:'modifierQuiz/:id',component:ModifierQuizComponent},
  {path:'ajouterQuiz/:id',component:CreerQuizComponent},
  {path:'formateur',component:FormateurComponent},
  {path:'ajouterFormateur',component:AjouterFormateurComponent},
  {path:'',redirectTo:'formation',pathMatch:'full'},
  {path:'**',component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
