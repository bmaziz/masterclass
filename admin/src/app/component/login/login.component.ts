import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  message: string = "";
  constructor(private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.nonNullable.group({
      username: ['', Validators.required],
      pwd: ['', Validators.required]
    })
  }

  public get Username() {
    return this.loginForm.get('username');
  }

  public get Pwd() {
    return this.loginForm.get('pwd');
  }
  authentifier() {
    const { username, pwd } = this.loginForm.value;

    this.loginService.login(username, pwd).subscribe(res => {
      
      console.log(res.status);
      
      if (res.data) {
        this.router.navigate(["/admin"]);

        localStorage.setItem('role', "Admin");
        this.message = ""
        

      }
      else {
        this.message = "Login ou mot de passe incorrect";
        
      }
    }
    )

    // if (!this.loginService.login(username, pwd)) {
    //   this.message = "Login ou mot de passe incorrect";
    //   localStorage.setItem('role', 'none');
    // }
    // else {
    //   localStorage.setItem("role", "Admin")
    //   this.router.navigate(["/admin"]);


    // }

  }
}
