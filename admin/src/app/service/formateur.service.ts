import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormateurService {

  constructor(private http:HttpClient) { }
  URL="http://localhost:3000/formateur";
  getAllFormateurData(): Observable<any> {
    return this.http.get(this.URL);
  }
  getFormateurById(id:Number):Observable<any>{
    return this.http.get(this.URL+"/"+id)
  }
  postFormateur(data:any):Observable<any>{
    return this.http.post(this.URL,data)
  }
  deleteFormateur(id:Number):Observable<any>{
    return this.http.delete(this.URL+"/"+id)
  }
  updateFormateur(id:Number,data:any):Observable<any>{
    return this.http.put(this.URL+"/"+id,data)
  }
}
