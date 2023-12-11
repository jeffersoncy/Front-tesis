import { Component, OnInit } from '@angular/core';

import { ChartType } from 'angular-google-charts';
import { Departamento } from 'src/app/core/models/departamento';
import { TesisService } from 'src/app/core/services/tesis.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-tesis-maps',
  templateUrl: './tesis-maps.component.html',
  styleUrls: ['./tesis-maps.component.scss']
})
export class TesisMapsComponent implements OnInit{
  public titulo = "Todos los departamentos";
  public listaDepartamentos !: Array<Departamento>;
  depatamentoSeleccionado:string = "";

  mainChart: any;

  type = ChartType.GeoChart
  peiType = ChartType.PieChart

  columns = ['Province', 'Population'];
  pieColumns = ['Task', 'Hours per Day'];

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

  public pieChartData:any;

  pieChartOptions = {
    chartArea: { width: '80%', height: '80%' }
  };

  pieWidth = 600;
  pieHeight = 300;

  constructor(
    private _tesisService:TesisService
  ) {
    this.listaDepartamentos = new Array<Departamento>();
  }

  ngOnInit(): void {
    this.obtenerListaDepartamentos()
    this.cargarRegistros('todos');
    this.cargarConteoNivelRiesgo('todos');
  }

  obtenerListaDepartamentos():void{
    this._tesisService.getDepartamentos().subscribe(res =>{
      //console.log(res);
      //console.log(typeof(res));
      for (let depto in res) {
        if (res.hasOwnProperty(depto)) {
          //console.log("Llave:" + depto + " Valor:" + res[depto]);
          let departamento:Departamento = new Departamento();
          departamento.valor = depto
          departamento.label = res[depto]
          this.listaDepartamentos.push(departamento)
        }
      }
      console.log(this.listaDepartamentos);
    },
    error =>{
      console.log("Error al obtener lista de registros");
      console.log("Error:" + error);
    });
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

  cargarConteoNivelRiesgo(filtro_depto:string){
    this._tesisService.getConteoRiesgo(filtro_depto).subscribe(res =>{

      let array_data_nivel_tipo = []
      let array_data_nivel_conteo = []
      let array_data = []
      for (let nivel in res) {
        if (res.hasOwnProperty(nivel)) {
          //let data_depto = [depto,res[depto]];
          array_data_nivel_tipo.push(nivel);
          array_data_nivel_conteo.push(Number(res[nivel]))
          let data_depto = [nivel,res[nivel]];
          array_data.push(data_depto);
        }
      }
      this.pieChartData = array_data
      this.data_nivel_conteo = array_data_nivel_conteo
      this.data_nivel_tipo = array_data_nivel_tipo

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

  realizarFiltro(){
    console.log("Departamento seleccionado:" + this.depatamentoSeleccionado);
    let auxDeptoSelect = this.depatamentoSeleccionado;
    if (this.depatamentoSeleccionado === '') {
      this.titulo = 'Todos los departamentos'
      auxDeptoSelect = 'todos'
    } else {
      for (let index = 0; index < this.listaDepartamentos.length; index++) {
        const departamento = this.listaDepartamentos[index];
        if (departamento.valor === this.depatamentoSeleccionado) {
          this.titulo = departamento.label!;
        }

      }
    }

    this.cargarConteoNivelRiesgo(auxDeptoSelect)

  }

}
