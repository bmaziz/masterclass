import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  constructor(private http:HttpClient) { }
  URL="http://localhost:3000/formation";
  getAllFormationData(): Observable<any> {
    return this.http.get(this.URL);
  }
  getFormationById(id:Number):Observable<any>{
    return this.http.get(this.URL+"/"+id)
  }
  postFormation(data:any):Observable<any>{
    return this.http.post(this.URL,data)
  }
  deleteFormation(id:Number):Observable<any>{
    return this.http.delete(this.URL+"/"+id)
  }
  getDemande():Observable<any>{
    return this.http.get(this.URL+"/demande")
  }
  updateFormation(idFormation:number,data:any):Observable<any>{
    return this.http.put(this.URL+"/"+idFormation,data)
  }
  accepterDemande(idFormation:number,idEtudiant:number):Observable<any>{
    return this.http.put(this.URL+'/accepterDemande/'+idFormation+"/"+idEtudiant,null)
  }
  refuserDemande(idFormation:number,idEtudiant:number):Observable<any>{
    return this.http.delete(this.URL+'/refuserDemande/'+idFormation+"/"+idEtudiant)
  }


}
