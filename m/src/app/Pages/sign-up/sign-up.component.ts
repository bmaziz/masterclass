import { Component } from '@angular/core';
import { SignUpCardComponent } from '../../Components/sign-up-card/sign-up-card.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [SignUpCardComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {

}
