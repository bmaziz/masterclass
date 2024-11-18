import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { Formation } from '../../Interfaces/formation.model';
import { getDefaultFormation } from '../../Utils/formation-utils';

interface Contenu {
    contenu:string;
}

interface Programme {
  titre: string;
  contenu: Contenu[];
}

@Component({
  selector: 'app-formation-program',
  standalone: true,
  imports: [CommonModule, MdbAccordionModule],
  templateUrl: './formation-program.component.html',
  styleUrl: './formation-program.component.scss'
})
export class FormationProgramComponent {
    @Input() Formation: Formation = getDefaultFormation();
  
   programmes: Programme[] = [];

   ngOnInit(){
    this.programmes = this.Formation.programme;
   }


}
