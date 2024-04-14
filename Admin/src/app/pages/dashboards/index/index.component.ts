import { Component, ElementRef } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { TesisService } from 'src/app/core/services/tesis.service';
import { VariableSignificado } from 'src/app/core/models/variable_significado';

// amCharts imports


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: [DecimalPipe]
})
export class IndexComponent {
  public variablesSignificado: VariableSignificado[] = [];
  constructor(private _tesisService: TesisService, private router: Router, private elRef: ElementRef) { }

  ngOnInit(): void {
    this.obtenerListaVariables()
  }

  obtenerListaVariables(): void {
    this._tesisService.getVariablesSignificado().subscribe(res => {
      for (let index = 0; index < res.variables.length; index++) {
        let dataObjeto = res.variables[index];
        let objVariableSignificado: VariableSignificado = new VariableSignificado;
        objVariableSignificado.clave = dataObjeto.clave
        objVariableSignificado.significado = dataObjeto.significado
        this.variablesSignificado.push(objVariableSignificado)
      }
    },
      error => {
        console.log("Error al obtener lista de registros");
        console.log("Error:" + error);
      });
  }

  masInfo() {
    /*const element = this.elRef.nativeElement.querySelector('#informacion');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      window.scrollBy(0, -100); // Ajusta el valor "-100" según lo necesites
    }*/
    const element = this.elRef.nativeElement.querySelector('#informacion');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.scrollBy(0, 840);
    }
  }

  dirigirFormulario() {
    this.router.navigate(['/forms/tesis-predict'])
  }

}
