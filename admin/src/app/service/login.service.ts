import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  URL="http://localhost:3000/admin"
  constructor(private http:HttpClient) { }

  public login(username:string, pwd:string):Observable<any>{
    return this.http.get(`${this.URL}/${username}/${pwd}`);
  }

  public logout(){
    localStorage.removeItem('role');
  }
}
