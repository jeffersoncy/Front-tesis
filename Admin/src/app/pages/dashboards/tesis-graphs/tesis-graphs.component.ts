import { Component, OnInit } from '@angular/core';
import { Registro } from 'src/app/core/models/registro';
import { TesisService } from 'src/app/core/services/tesis.service';

@Component({
  selector: 'app-tesis-graphs',
  templateUrl: './tesis-graphs.component.html',
  styleUrls: ['./tesis-graphs.component.scss']
})

export class TesisGraphsComponent implements OnInit{

  public registros:Array<Registro> = []

  constructor(
    private _tesisService:TesisService
  ){}

  ngOnInit(): void {
    this.cargarRegistros();
  }

  cargarRegistros(){
    this._tesisService.getRegistros().subscribe(res =>{
      this.registros = res
      console.log(this.registros);
    },
    error =>{
      console.log("Error al obtener lista de registros");
      console.log("Error:" + error);
    });
  }

}
