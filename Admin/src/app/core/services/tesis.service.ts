import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalComponent } from "../../global-component";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TesisService {

  constructor(private http:HttpClient) { }

  getRegistros(): Observable<any> {
    return this.http.get<any>(GlobalComponent.API_TESIS + GlobalComponent.registro)
  }

  /*predictUser(Object obj): Observable<any> {
    return this.http.post
  }*/


}
