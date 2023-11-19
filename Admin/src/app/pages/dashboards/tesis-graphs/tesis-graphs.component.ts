import { Component, OnInit } from '@angular/core';
import { TesisService } from 'src/app/core/services/tesis.service';

@Component({
  selector: 'app-tesis-graphs',
  templateUrl: './tesis-graphs.component.html',
  styleUrls: ['./tesis-graphs.component.scss']
})

export class TesisGraphsComponent implements OnInit{

  constructor(
    private _tesisService:TesisService
  ){}

  ngOnInit(): void {
    this.cargarRegistros();
  }

  cargarRegistros(){
    this._tesisService.getRegistros().subscribe(res =>{
      console.log(res);
    },
    error =>{
      console.log("Error al obtener lista de registros");
      console.log("Error:" + error);
    });
  }

}
