import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { VariableSignificado } from 'src/app/core/models/variable_significado';
import { TesisService } from 'src/app/core/services/tesis.service';
import { selectData, selectorderata, selectproductData } from 'src/app/store/Ecommerce/ecommerce-selector';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.scss']
})
export class InformacionComponent {

  orderList: any;
  sortValue: any = 'Order Date';
  public variablesSignificado:VariableSignificado[] = [];

  constructor(private _tesisService:TesisService,) { }

  ngOnInit() {
    this.obtenerListaVariables()
    console.log(this.variablesSignificado);

  }

  obtenerListaVariables(): void {
    this._tesisService.getVariablesSignificado().subscribe(res => {
      for (let index = 0; index < res.variables.length; index++) {
        let dataObjeto = res.variables[index];
        let objVariableSignificado:VariableSignificado = new VariableSignificado;
        objVariableSignificado.clave = dataObjeto.clave
        objVariableSignificado.significado = dataObjeto.significado
        this.variablesSignificado.push(objVariableSignificado)
      }
    },
    error =>{
      console.log("Error al obtener lista de registros");
      console.log("Error:" + error);
    });
  }

}
