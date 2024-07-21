import { Component, HostListener,  ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { TesisService } from 'src/app/core/services/tesis.service';
import { VariableSignificado } from 'src/app/core/models/variable_significado';

@Component({
  selector: 'app-info-app',
  templateUrl: './info-app.component.html',
  styleUrls: ['./info-app.component.scss']
})
export class InfoAppComponent {

  public variablesSignificado: VariableSignificado[] = [];
  constructor(private _tesisService: TesisService, private router: Router, private elRef: ElementRef) { }


  ngOnInit(): void {
    this.onWindowScroll();  // Trigger scroll effect on load
    this.obtenerListaVariables()
  }

  scrollTo(section: string) {
    const element = this.elRef.nativeElement.querySelector(`#${section}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const sections = this.elRef.nativeElement.querySelectorAll('section');
    sections.forEach((section: HTMLElement) => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        section.classList.add('in-view');
      } else {
        section.classList.remove('in-view');
      }
    });
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

}
