import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router:Router,
    private loginService:LoginService){}

  onDisconnect(){
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
