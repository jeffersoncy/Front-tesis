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

  getConteoDepartamentos(filtro_param: string): Observable<any>{
    return this.http.get<any>(GlobalComponent.API_TESIS + GlobalComponent.conteo_depto + 'filtro_param=' + filtro_param)
  }

  getConteoNivelEduXFrecConsumoMarihuana(filtro1_param: string, filtro2_param: string): Observable<any>{
    return this.http.get<any>(GlobalComponent.API_TESIS + GlobalComponent.conteo_niv_eduXfrecMarih + 'filtro1_param=' + filtro1_param + '&filtro2_param=' + filtro2_param )
  }

  getConteoNivelEduXFrecConsumoCocaina(): Observable<any>{
    return this.http.get<any>(GlobalComponent.API_TESIS + GlobalComponent.conteo_niv_eduXfrecCocaina)
  }

  getConteoNivelEduXFrecConsumoBazuco(): Observable<any>{
    return this.http.get<any>(GlobalComponent.API_TESIS + GlobalComponent.conteo_niv_eduXfrecBazuco)
  }

  predictUser(registro:Registro): Observable<any> {
    return this.http.post<any>(GlobalComponent.API_TESIS + GlobalComponent.predict, registro);
  }

  /*predictUser(registro:Registro) {

  }*/

  getConteoRiesgoTipoSexo(): Observable<any>{
    return this.http.get<any>(GlobalComponent.API_TESIS + GlobalComponent.conteo_riesgoXsexoTipo)
  }

  getVariables(): Observable<any>{
    return this.http.get<any>(GlobalComponent.API_TESIS + GlobalComponent.lista_variables)
  }

}
