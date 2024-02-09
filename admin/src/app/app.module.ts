import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormationComponent } from './component/formation/formation.component';
import { DetailFormationComponent } from './component/detail-formation/detail-formation.component';
import { FormateurComponent } from './component/formateur/formateur.component';
import { AjouterFormationComponent } from './component/ajouter-formation/ajouter-formation.component';
import { ModifierFormationComponent } from './component/modifier-formation/modifier-formation.component';
import { AjouterFormateurComponent } from './component/ajouter-formateur/ajouter-formateur.component';
import { ModifierFormateurComponent } from './component/modifier-formateur/modifier-formateur.component';
import { ErrorComponent } from './component/error/error.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import {HttpClientModule} from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreerQuizComponent } from './component/creer-quiz/creer-quiz.component';
import { ModifierQuizComponent } from './component/modifier-quiz/modifier-quiz.component';
import { DemandeFormationComponent } from './component/demande-formation/demande-formation.component';

@NgModule({
  declarations: [
    AppComponent,
    FormationComponent,
    DetailFormationComponent,
    FormateurComponent,
    AjouterFormationComponent,
    ModifierFormationComponent,
    AjouterFormateurComponent,
    ModifierFormateurComponent,
    ErrorComponent,
    NavbarComponent,
    CreerQuizComponent,
    ModifierQuizComponent,
    DemandeFormationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
