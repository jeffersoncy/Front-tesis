import { Component, OnInit, ElementRef } from '@angular/core';
import { Registro } from 'src/app/core/models/registro';
import { Variable } from 'src/app/core/models/variable';
import { TesisService } from 'src/app/core/services/tesis.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-tesis-graphs',
  templateUrl: './tesis-graphs.component.html',
  styleUrls: ['./tesis-graphs.component.scss']
})

export class TesisGraphsComponent implements OnInit{
  breadCrumbItems!: Array<{}>;
  basicBarChart: any;
  customDataLabelsChart: any;
  stackedBarChart: any;
  stacked100BarChartMarihuana: any;
  stacked100BarChartCocaina: any;
  stacked100BarChartBazuco: any;
  barWithNegativeChart: any;
  barWithMarkersChart: any;
  reversedBarChart: any;
  patternedChart: any;
  groupedBarChart: any;
  barWithImageChart: any;
  basicHeatmapChart: any;
  variable1_param:string = "";
  variable2_param:string = "";
  variable_param:string = "";

  public titulo = "Nivel educativo vs Frecuencia consumo marihuana";
  public tituloGraficoConteo = "Conteo de personas por departamento";
  public listaVariables !: Array<Variable>;
  public registros:Array<Registro> = []

  public data_nivel_tipo:any;
  public data_nivel_conteo:any;

  public data_depto_nom:any;
  public data_depto_conteo:any;

  public data_claves_frec_consumo_marihuana:any;
  public data_valores_frec_consumo_marihuana:any;
  public data_claves_nivel_edu_marihuana:any;
  
  public data_claves_frec_consumo_cocaina:any;
  public data_valores_frec_consumo_cocaina:any;
  public data_claves_nivel_edu_cocaina:any;
  
  public data_claves_frec_consumo_bazuco:any;
  public data_valores_frec_consumo_bazuco:any;
  public data_claves_nivel_edu_bazuco:any;

  public data_claves_riesgo_sexo_tipo:any;
  public data_valores_riesgo_sexo_tipo:any;
  public data_claves_sexo_tipo:any;


  constructor(
    private _tesisService:TesisService, private myElement: ElementRef
  ){
    this.myElement.nativeElement // <- your direct element reference
  }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'Apexcharts' },
      { label: 'Bar Charts', active: true }
    ];
    this.obtenerListaVariables();
    this.cargarRegistros();
    this.cargarConteoNivelRiesgo('todos');
    this.cargarConteoDepto('departamento');
    this.cargarConteoNivelEduXFrecConsumoMarihuana('d2_05_nivel_educativo_tipo','frecuencia_consumo_cocaina_tipo');
    this.cargarConteoRiesgoXsexoTipo();
    // Chart Color Data Get Function
    this._basicBarChart('["--tb-success"]');
    this._customDataLabelsChart('["--tb-primary", "--tb-secondary", "--tb-success", "--tb-info", "--tb-warning", "--tb-danger", "--tb-dark", "--tb-primary", "--tb-success", "--tb-secondary"]');
    this._stackedBarChart('["--tb-primary", "--tb-success", "--tb-warning", "--tb-danger", "--tb-info"]');
    this._stacked100BarChartMarihuana('["--tb-dark", "--tb-success", "--tb-warning", "--tb-danger", "--tb-info"]');
    this._barWithNegativeChart('["--tb-primary", "--tb-success"]');
  }

    // Chart Colors Set
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
    
    /**
   * Basic Bar Chart
   */
  private _basicBarChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.basicBarChart = {
      series: [{
        data: this.data_nivel_conteo,
        //data: [380, 430, 450, 475, 550],
      },],
      chart: {
        height: 350,
        type: "bar",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: colors,
      grid: {
        borderColor: "#f1f1f1",
      },
      xaxis: {
        categories: this.data_nivel_tipo,
      },
    };
  }

  /**
  * Custom DataLabels Bar
  */
  private _customDataLabelsChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.customDataLabelsChart = {
      series: [{
        data: this.data_depto_conteo, 
        //[400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
        //data: this.data_nivel_tipo,
      },],
      chart: {
        type: "bar",
        height: 350,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          barHeight: "100%",
          distributed: true,
          horizontal: true,
          dataLabels: {
            position: "bottom",
          },
        },
      },
      colors: colors,
      dataLabels: {
        enabled: true,
        textAnchor: "start",
        style: {
          colors: ["#fff"],
        },
        formatter: function (val: any, opt: any) {
          return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
        },
        offsetX: 0,
        dropShadow: {
          enabled: false,
        },
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
      xaxis: {
        categories: this.data_depto_nom,
      },
      yaxis: {
        labels: {
          show: false,
        },
      },
      title: {
        text: "Conteo de personas por variable",
        align: "center",
        floating: true,
        style: {
          fontWeight: 600,
        },
      },
      subtitle: {
        text: "Nombres de categorías como etiquetas de datos dentro de cada barra",
        align: "center",
      },
      tooltip: {
        theme: "dark",
        x: {
          show: false,
        },
        y: {
          title: {
            formatter: function () {
              return "";
            },
          },
        },
      },
    };
  }

  /**
  * Stacked Bar Charts
   */
  private _stackedBarChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.stackedBarChart = {
      series: [{
        name: this.data_claves_nivel_edu_marihuana[0],
        data: this.data_valores_frec_consumo_marihuana[0],
      },
      {
        name: this.data_claves_nivel_edu_marihuana[1],
        data: this.data_valores_frec_consumo_marihuana[1],
      },
      {
        name: this.data_claves_nivel_edu_marihuana[2],
        data: this.data_valores_frec_consumo_marihuana[2],
      },
      {
        name: this.data_claves_nivel_edu_marihuana[3],
        data: this.data_valores_frec_consumo_marihuana[3],
      },
      {
        name: this.data_claves_nivel_edu_marihuana[4],
        data: this.data_valores_frec_consumo_marihuana[4],
      },
      ],
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
      title: {
        text: "Fiction Books Sales",
        style: {
          fontWeight: 600,
        },
      },
      xaxis: {
        categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
        labels: {
          formatter: function (val: any) {
            return val + "K";
          },
        },
      },
      yaxis: {
        title: {
          text: undefined,
        },
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return val + "K";
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        offsetX: 40,
      },
      colors: colors,
    };
  }

  /**
  * Stacked 100 Bar Charts marihuana
  */
  private _stacked100BarChartMarihuana(colors: any) {
    colors = this.getChartColorsArray(colors);
    const series = this.data_claves_nivel_edu_marihuana.map((clave: any, index: any) => ({
    name: clave,
    data: this.data_valores_frec_consumo_marihuana[index],
    }));
    this.stacked100BarChartMarihuana = {
      series: series,
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        stackType: "100%",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
      title: {
        text: "",
        style: {
          fontWeight: 600,
        },
      },
      xaxis: {
        categories: this.data_claves_frec_consumo_marihuana, 
        //[2008, 2009, 2010, 2011, 2012, 2013, 2014],
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return val;
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        offsetX: 40,
      },
      colors: colors,
    };
  }


  /**
  * Bar with Negative Values
  */

  private _barWithNegativeChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.barWithNegativeChart = {
      series: [{
        name: this.data_claves_sexo_tipo[0],
        data: this.data_valores_riesgo_sexo_tipo[0],
      },
      {
        name: this.data_claves_sexo_tipo[1],
        data: this.data_valores_riesgo_sexo_tipo[1],
      },
      ],
      chart: {
        type: "bar",
        height: 360,
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      colors: colors,
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: "80%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
      grid: {
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      yaxis: {
        min: -2500,
        max: 2500,
        title: {
          text: "Riesgo",
          style: {
            fontWeight: 600,
          },
        },
      },
      tooltip: {
        shared: false,
        x: {

        },
        y: {
          formatter: function (val: any) {
            return Math.abs(val) ;
          },
        },
      },
      title: {
        text: "",
        style: {
          fontWeight: 600,
        },
      },
      xaxis: {
        categories: this.data_claves_riesgo_sexo_tipo,
        title: {
          text: "Nro. de personas",
        },
        labels: {

        },
      },
    };
  }

  cargarConteoDepto(parVariableSelect1:string){
    this._tesisService.getConteoDepartamentos(parVariableSelect1).subscribe(res =>{
      let array_data_depto_nom = []
      let array_data_depto_conteo = []
      for(let nivel in res) {
        if(res.hasOwnProperty(nivel)) {
          array_data_depto_nom.push(nivel);
          array_data_depto_conteo.push(Number(res[nivel]))
        }
      }

      this.data_depto_nom = array_data_depto_nom
      this.data_depto_conteo = array_data_depto_conteo

      this._customDataLabelsChart('["--tb-primary", "--tb-secondary", "--tb-success", "--tb-info", "--tb-warning", "--tb-danger", "--tb-dark", "--tb-primary", "--tb-success", "--tb-secondary"]');
    })
  }

  cargarConteoNivelRiesgo(filtro_depto:string){
    this._tesisService.getConteoRiesgo(filtro_depto).subscribe(res =>{

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

      //console.log('Valor de miVariable data nivel tipo: ', this.data_nivel_tipo);
      //console.log('Valor de miVariable data nivel conteo: ', this.data_nivel_conteo);
      
      this._basicBarChart('["--tb-success"]');
      //this._mainChart('["--tb-primary-bg-subtle", "--tb-light", "--tb-primary"]');
    },
    error =>{
      swal.fire('Error', 'Error al cargar los datos por nivel de riesgo:' + error, 'error');
    });

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


  cargarConteoNivelEduXFrecConsumoMarihuana(parVariableSelect1:string,parVariableSelect2:string){
    this._tesisService.getConteoNivelEduXFrecConsumoMarihuana(parVariableSelect1,parVariableSelect2).subscribe(res =>{
      let array_data_claves_frec_consumo_marihuana = [];
      let array_data_valores_frec_consumo_marihuana: number[][] = [];
      let array_claves_nivel_edu: string[] = [];

      for (let nivelEdu in res) {
        if (res.hasOwnProperty(nivelEdu)) {
          array_data_claves_frec_consumo_marihuana.push(nivelEdu);
          array_data_valores_frec_consumo_marihuana.push(Object.values(res[nivelEdu]));
          array_claves_nivel_edu.push(...Object.keys(res[nivelEdu]));
        }
      }

       // Crear un conjunto para eliminar duplicados
      let conjuntoClavesUnicas = new Set(array_claves_nivel_edu);

      // Convertir el conjunto de vuelta a un array
      let array_claves_unicas_nivel_edu = Array.from(conjuntoClavesUnicas); 

      // Se Crea un objeto para almacenar las agrupaciones por clave
      let objetoAgrupadoPorClave: { [clave: string]: number[] } = {};
  
      array_claves_unicas_nivel_edu.forEach(clave => {
        // Se obtiene el índice de la clave en el array
        let indiceClave = array_claves_nivel_edu.indexOf(clave);
  
        // Se Verifica si la clave ya existe en el objeto
        if (objetoAgrupadoPorClave[clave]) {
          // Si existe, agregar los valores correspondientes
          objetoAgrupadoPorClave[clave].push(...array_data_valores_frec_consumo_marihuana.map(valores => valores[indiceClave]));
        } else {
          // Si no existe, crear un nuevo array con los valores
          objetoAgrupadoPorClave[clave] = array_data_valores_frec_consumo_marihuana.map(valores => valores[indiceClave]);
        }
      });

      // Convertir el objeto a un array de arrays
      let arrayAgrupadoPorClave = Object.values(objetoAgrupadoPorClave);
  
      //console.log('Array agrupado por clave: ', arrayAgrupadoPorClave);
      //
      //console.log('Valor de miVariable data frecuencia consumo numeros: ', array_data_valores_frec_consumo_marihuana);
      //console.log('Valor de miVariable data nivel educativo tipo: ', array_claves_unicas_nivel_edu);
      //console.log('Valor de las variables segun la seleccionada: ', array_data_claves_frec_consumo_marihuana);
      this.data_claves_frec_consumo_marihuana = array_data_claves_frec_consumo_marihuana;
      this.data_claves_nivel_edu_marihuana = array_claves_unicas_nivel_edu;
      this.data_valores_frec_consumo_marihuana = arrayAgrupadoPorClave;

      this._stacked100BarChartMarihuana('["--tb-primary", "--tb-success", "--tb-warning", "--tb-danger", "--tb-info", "--tb-dark", "--tb-gray", "--tb-purple"]');
      this._stackedBarChart('["--tb-primary", "--tb-success", "--tb-warning", "--tb-danger", "--tb-info"]');
    
    },
    error =>{
      swal.fire('Error', 'Error cargando los datos de nivel educativo por frecuencia consumo marihuana:' + error, 'error');
    });
  }

  cargarConteoRiesgoXsexoTipo(){
    this._tesisService.getConteoRiesgoTipoSexo().subscribe(res =>{
      let array_data_claves_riesgo = [];
      let array_data_valores_riesgo: number[][] = [];
      let array_claves_sexo_tipo: string[] = [];

      for (let riesgo in res) {
        if (res.hasOwnProperty(riesgo)) {
          array_data_claves_riesgo.push(riesgo);
          array_data_valores_riesgo.push(Object.values(res[riesgo]));
          array_claves_sexo_tipo.push(...Object.keys(res[riesgo]));
        }
      }

       // Crear un conjunto para eliminar duplicados
      let conjuntoClavesUnicas = new Set(array_claves_sexo_tipo);

      // Convertir el conjunto de vuelta a un array
      let array_claves_unicas_sexo_tipo = Array.from(conjuntoClavesUnicas); 

      // Se Crea un objeto para almacenar las agrupaciones por clave
      let objetoAgrupadoPorClave: { [clave: string]: number[] } = {};
  
      array_claves_unicas_sexo_tipo.forEach(clave => {
        // Se obtiene el índice de la clave en el array
      let indiceClave = array_claves_sexo_tipo.indexOf(clave);
  
        // Se Verifica si la clave ya existe en el objeto
        if (objetoAgrupadoPorClave[clave]) {
          // Si existe, agregar los valores correspondientes
          objetoAgrupadoPorClave[clave].push(...array_data_valores_riesgo.map(valores => valores[indiceClave]));
        } else {
          // Si no existe, crear un nuevo array con los valores
          objetoAgrupadoPorClave[clave] = array_data_valores_riesgo.map(valores => valores[indiceClave]);
        }
      });

      // Convertir el objeto a un array de arrays
      let arrayAgrupadoPorClave = Object.values(objetoAgrupadoPorClave);
  
      arrayAgrupadoPorClave[1] = arrayAgrupadoPorClave[1].map(x => -x);

      console.log('Array agrupado por clave: ', arrayAgrupadoPorClave);
      console.log('Valor de miVariable data clave riesgo: ', array_data_claves_riesgo);
      console.log('Valor de miVariable data valores riesgo : ', array_data_valores_riesgo);
      console.log('Valor de miVariable data sexo tipo sexo tipo: ', array_claves_unicas_sexo_tipo);

      this.data_claves_riesgo_sexo_tipo = array_data_claves_riesgo;
      this.data_claves_sexo_tipo = array_claves_unicas_sexo_tipo;
      this.data_valores_riesgo_sexo_tipo = arrayAgrupadoPorClave;

      this._barWithNegativeChart('["--tb-primary", "--tb-success"]');
    },
    error =>{
      swal.fire('Error', 'Error cargando los datos de nivel educativo por frecuencia consumo bazuco:' + error, 'error');
    });
  }

  obtenerListaVariables(): void {
    this._tesisService.getVariables().subscribe(res => {
      console.log(res);
      console.log(typeof(res));
      if (res.variables && Array.isArray(res.variables)) {
        this.listaVariables = res.variables.map((variable: any) => {
          return {
            valor: variable.nombreReal,
            label: variable.nombreFake
          };
        });
      } else {
        console.error('La respuesta no contiene el array "variables"');
      }
    },
    error =>{
      console.log("Error al obtener lista de registros");
      console.log("Error:" + error);
    });
  }

  consultarDatosParametros(){
    let auxVariableSelect1 = this.variable1_param;
    let auxVariableSelect2 = this.variable2_param;
    if(this.variable1_param != '' && this.variable2_param != ''){
      this.titulo = this.buscarNombreFake(this.variable1_param) + ' vs ' +this.buscarNombreFake(this.variable2_param);
      this.cargarConteoNivelEduXFrecConsumoMarihuana(auxVariableSelect1,auxVariableSelect2)
    }
  }

  consultarDatosParametro(){
    let auxVariableSelect = this.variable_param;
    if(this.variable_param != ''){
      this.tituloGraficoConteo = 'Conteo de personas por ' + this.buscarNombreFake(this.variable_param) || '';
      this.cargarConteoDepto(auxVariableSelect)
    }
  }

  public buscarNombreFake(parVariable:String){
    for(let index = 0; index < this.listaVariables.length; index++){
      if(this.listaVariables[index].valor === parVariable){
        return this.listaVariables[index].label;
      }
    }
    return "";
  }

}
