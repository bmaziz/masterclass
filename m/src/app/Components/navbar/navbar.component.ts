import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { Subscription } from 'rxjs';
import { SettingsModalComponent } from '../settings-modal/settings-modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,
  RouterModule, MdbDropdownModule, MdbRippleModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  currentUser: any;
  authSubscription: Subscription;

  modalRef: MdbModalRef<SettingsModalComponent> | null = null;


  constructor(private authService: AuthService, private modalService: MdbModalService) {
    this.currentUser = this.authService.getUser();

       // Souscrire aux changements d'état de connexion
       this.authSubscription = this.authService.currentUser.subscribe(user => {
        this.currentUser = user;
      });


  }



  
  ngOnDestroy() {
    // Se désabonner lors de la destruction du composant pour éviter les fuites de mémoire
    this.authSubscription.unsubscribe();
  }
  
  
  logout(){
    this.authService.logout();
    this.currentUser = null;
  }

  openSettingsModal() {
    this.modalRef = this.modalService.open(SettingsModalComponent)
  }
}
