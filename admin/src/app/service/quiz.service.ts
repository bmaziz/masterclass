import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient) { }
  URL="http://localhost:3000/quiz";
  postQuiz(id:number,data:any):Observable<any>{
    return this.http.post(this.URL+"/"+id,data)
  }
  getQuiz(id:number):Observable<any>{
    return this.http.get(this.URL+"/"+id)
  }
  deleteQuiz(id:number):Observable<any>{
    return this.http.delete(this.URL+"/"+id)
  }
  getQuizById(id:number):Observable<any>{
    return this.http.get(this.URL+"/question/"+id)
  }
  putQuestion(idQuestion:number,data:any):Observable<any>{
    return this.http.put(this.URL+"/"+idQuestion,data)
  }
  postQuestion(idQuiz:number,data:any):Observable<any>{
    console.log("service queee",data);
    
    return this.http.post(this.URL+"/question/"+idQuiz,data)
  }
}
