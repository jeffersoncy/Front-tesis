import { Component, OnInit } from '@angular/core';

import { ChartType } from 'angular-google-charts';
import { TesisService } from 'src/app/core/services/tesis.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-tesis-maps',
  templateUrl: './tesis-maps.component.html',
  styleUrls: ['./tesis-maps.component.scss']
})
export class TesisMapsComponent implements OnInit{

  mainChart: any;

  type = ChartType.GeoChart

  columns = ['Province', 'Population'];

  width = 1292;
  height = 798;

  public data:any;

  public data_nivel_tipo:any;
  public data_nivel_conteo:any;

  options = {
    title: 'Mapa de calor de Colombia por departamentos',
    region: 'CO',
    resolution: 'provinces',
    colorAxis: {colors: ['#ffffff', '#ffff00', '#ff0000']},
    backgroundColor: '#81d4fa',
    datalessRegionColor: '#9DE1A0',
  };

  constructor(
    private _tesisService:TesisService
  ) {}

  ngOnInit(): void {
    this.cargarRegistros('todos');
    this.cargarConteoNivelRiesgo();


  }

  cargarRegistros(tipo_filtro:string){
    this._tesisService.getConteoFiltro(tipo_filtro).subscribe(res =>{

      let array_data = []
      for (let depto in res) {
        if (res.hasOwnProperty(depto)) {
          let data_depto = [depto,res[depto]];
          array_data.push(data_depto);
        }
      }

      this.data = array_data

    },
    error =>{
      swal.fire('Error', 'Error al cargar los datos por filtro:' + error, 'error');
    });

  }

  changebalanceValue(tipo_filtro : string) {
    this.cargarRegistros(tipo_filtro);
  }

  cargarConteoNivelRiesgo(){
    this._tesisService.getConteoRiesgo().subscribe(res =>{

      let array_data_nivel_tipo = []
      let array_data_nivel_conteo = []
      for (let nivel in res) {
        if (res.hasOwnProperty(nivel)) {
          //let data_depto = [depto,res[depto]];
          array_data_nivel_tipo.push(nivel);
          array_data_nivel_conteo.push(Number(res[nivel]))
        }
      }

      this.data_nivel_conteo = array_data_nivel_conteo
      this.data_nivel_tipo = array_data_nivel_tipo

      console.log(this.data_nivel_tipo);
      console.log(this.data_nivel_conteo);

      this._mainChart('["--tb-primary-bg-subtle", "--tb-light", "--tb-primary"]');
    },
    error =>{
      swal.fire('Error', 'Error al cargar los datos por nivel de riesgo:' + error, 'error');
    });

  }

  private _mainChart(colors: any) {
    const data = [];
    for (let i = 0; i < 5; ++i) {
      data.push(Math.round(Math.random() * 200));
    }
    colors = this.getChartColorsArray(colors);
    this.mainChart = {
      grid: {
        left: '3%',
        right: '6%',
        bottom: '0%',
        top: '4%',
        containLabel: true
      },
      xAxis: {
        max: 'dataMax',

        splitLine: {
          lineStyle: {
            color: "rgba(135,136, 138,.1)"
          }
        },
      },

      yAxis: {
        type: 'category',
        //data: ['Canada', 'US', 'Serbia', 'Russia', 'Brazil'],
        data: this.data_nivel_tipo,
        inverse: true,
        animationDuration: 300,
        animationDurationUpdate: 300,
      },
      series: [
        {
          realtimeSort: true,
          type: 'bar',
          data: this.data_nivel_conteo,
          label: {
            color: "#87888a",
            show: true,
            position: 'right',
            valueAnimation: true
          }
        }
      ],
      legend: {
        show: false
      },
      color: colors,
      animationDuration: 0,
      animationDurationUpdate: 3000,
      animationEasing: 'linear',
      animationEasingUpdate: 'linear'
    }
  }

  private getChartColorsArray(colors: any) {
    colors = JSON.parse(colors);
    return colors.map(function (value: any) {
      var newValue = value.replace(" ", "");
      if (newValue.indexOf(",") === -1) {
        var color = getComputedStyle(document.documentElement).getPropertyValue(newValue);
        if (color) {
          color = color.replace(" ", "");
          return color;
        }
        else return newValue;;
      } else {
        var val = value.split(',');
        if (val.length == 2) {
          var rgbaColor = getComputedStyle(document.documentElement).getPropertyValue(val[0]);
          rgbaColor = "rgba(" + rgbaColor + "," + val[1] + ")";
          return rgbaColor;
        } else {
          return newValue;
        }
      }
    });
  }

}
