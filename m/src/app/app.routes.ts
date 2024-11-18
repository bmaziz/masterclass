import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { FormationsComponent } from './Pages/formations/formations.component';
import { ErreurComponent } from './Pages/erreur/erreur.component';
import { FormationComponent } from './Pages/formation/formation.component';
import { LoginComponent } from './Pages/login/login.component';
import { SignUpComponent } from './Pages/sign-up/sign-up.component';
import { MesFormationsComponent } from './Pages/mes-formations/mes-formations.component';
import { QuizzComponent } from './Pages/quizz/quizz.component';
import { QuizzQuestionComponent } from './Pages/quizz-question/quizz-question.component';
import { QuizzResultComponent } from './Pages/quizz-result/quizz-result.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'formation/:id', component: FormationComponent },
  { path: 'quizz/:id/:numero', component: QuizzComponent },
  {path :'questions', component:QuizzQuestionComponent},
  {path:'results', component: QuizzResultComponent},
  { path: 'formations', component: FormationsComponent },
  { path:'login', component:LoginComponent},
  { path:'sign-up', component:SignUpComponent},
  {path:'mes-formations', component:MesFormationsComponent},


  { path: 'erreur', component: ErreurComponent },
  { path: '**', redirectTo: '/erreur' } // Redirection vers la page Erreur en cas de route inconnue
];
