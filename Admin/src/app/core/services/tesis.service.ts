import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalComponent } from "../../global-component";
import { Observable } from 'rxjs';
import { Filtro } from '../models/filtro';
import { Registro } from '../models/registro';

@Injectable({
  providedIn: 'root'
})

export class TesisService {

  constructor(private http:HttpClient) { }

  getRegistros(): Observable<Registro[]> {
    return this.http.get<Registro[]>(GlobalComponent.API_TESIS + GlobalComponent.registro)
  }

  getConteoFiltro(tipo_filtro : string): Observable<any>{
    return this.http.get<any>(GlobalComponent.API_TESIS + GlobalComponent.filtro + tipo_filtro)
  }

  getConteoRiesgo(departamento : string): Observable<any>{
    return this.http.get<any>(GlobalComponent.API_TESIS + GlobalComponent.num_riesgo + departamento)
  }

  getDepartamentos(): Observable<any>{
    return this.http.get<any>(GlobalComponent.API_TESIS + GlobalComponent.departamentos)
  }

  getConteoDepartamentos(): Observable<any>{
    return this.http.get<any>(GlobalComponent.API_TESIS + GlobalComponent.conteo_depto)
  }

  getConteoNivelEduXFrecConsumoMarihuana(): Observable<any>{
    return this.http.get<any>(GlobalComponent.API_TESIS + GlobalComponent.conteo_niv_eduXfrecMarih)
  }

  getConteoNivelEduXFrecConsumoCocaina(): Observable<any>{
    return this.http.get<any>(GlobalComponent.API_TESIS + GlobalComponent.conteo_niv_eduXfrecCocaina)
  }

  getConteoNivelEduXFrecConsumoBazuco(): Observable<any>{
    return this.http.get<any>(GlobalComponent.API_TESIS + GlobalComponent.conteo_niv_eduXfrecBazuco)
  }

  /*predictUser(Object obj): Observable<any> {
    return this.http.post
  }*/

  predictUser(registro:Registro) {

  }

}
