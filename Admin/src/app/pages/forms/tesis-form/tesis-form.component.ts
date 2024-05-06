import { Component, OnInit, ViewChild } from '@angular/core';
import { TesisService } from 'src/app/core/services/tesis.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Registro } from '../../../core/models/registro';
import { Departamento } from 'src/app/core/models/departamento';
import { CdkStepper } from '@angular/cdk/stepper';
import { HttpErrorResponse } from '@angular/common/http';
import swal from 'sweetalert2'
import { NgxSpinnerService } from "ngx-spinner";
import { Caracteristica } from 'src/app/core/models/caracteristica';
import { ChartType } from 'angular-google-charts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tesis-form',
  templateUrl: './tesis-form.component.html',
  styleUrls: ['./tesis-form.component.scss']
})
export class TesisFormComponent implements OnInit{
  @ViewChild(CdkStepper) stepper!: CdkStepper;
  selectedAccount = 'This is a placeholder';
  strokedCircleChart: any;
  distributedColumnChart: any;
  public validoFormulario !: boolean;
  public botonSiguiente : boolean = false;
  public mostrarCaracteristicas : boolean = false;
  public registro!:Registro;
  public listaDepartamentos !: Array<Departamento>;
  public loading : boolean = false;
  public prediccion : string = "";
  public sig_prediccion : string = "";
  public caracteristicas:Caracteristica[] = [];
  public data_porcentajes_caracteristicas:String[] = [];
  public data_claves_caracteristicas:Number[] = [];

  public gesPredictForm !: FormGroup;

  tabActiva = -1;

  seleccionarTab(index: number): void {
    this.tabActiva = index;
    this._strokedCircleChart('["--tb-primary"]');
  }

  submit!: boolean;
  formsubmit!: boolean;

  peiType = ChartType.PieChart
  pieColumns = ['Task', 'Hours per Day'];
  //public pieChartData:any;
  pieChartData = [
    ['Work', 25],
    ['Prueba', 75]
  ];
  pieChartOptions = {
    chartArea: { width: '70%', height: '70%' }
  };
  pieWidth = 600;
  pieHeight = 300;

  constructor(
    private _tesisService:TesisService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private router: Router
  ){
    this.listaDepartamentos = new Array<Departamento>();
    this.gesPredictForm = this.formBuilder.group({
      departamento: ['', [Validators.required]],
      residentes_hogar: ['', [Validators.required]],
      d2_04_num_hijos: ['', [Validators.required]],
      per_edad_tipo: ['', [Validators.required]],
      estrato_tipo: ['', [Validators.required]],
      situacion_tipo: ['', [Validators.required]],
      frecuencia_consumo_marihuana_tipo: ['', [Validators.required]],
      frecuencia_consumo_cocaina_tipo: ['', [Validators.required]],
      frecuencia_consumo_basuco_tipo: ['', [Validators.required]],
      per_sexo_tipo: ['', [Validators.required]],
      vive_padre_hogar_tipo: ['', [Validators.required]],
      vive_madre_hogar_tipo: ['', [Validators.required]],
      vivienda_tipo: ['', [Validators.required]],
      d_01_aporta_dinero_hogar_tipo: ['', [Validators.required]],
      d_08_estado_salud_tipo: ['', [Validators.required]],
      d_09_deprimido_tipo: ['', [Validators.required]],
      d_10_poco_interes_tipo: ['', [Validators.required]],
      d_11_h_conocimiento_riesgo_fumar_marihuana_frecuentemente_tipo: ['', [Validators.required]],
      d_11_k_conocimiento_riesgo_cocaina_frecuentemente_tipo: ['', [Validators.required]],
      d_11_n_conocimiento_riesgo_fumar_basuco_frecuentemente_tipo: ['', [Validators.required]],
      d_12_b_presenta_problema_consumo_sp_barrio_tipo: ['', [Validators.required]],
      d_12_c_presenta_problema_expendio_sp_barrio_tipo: ['', [Validators.required]],
      d2_01_etnia_tipo: ['', [Validators.required]],
      d2_03_estado_civil_tipo: ['', [Validators.required]],
      d2_05_nivel_educativo_tipo: ['', [Validators.required]],
      g_01_familiares_consumen_sp_tipo: ['', [Validators.required]],
      g_02_amigos_consumen_sp_tipo: ['', [Validators.required]],
      g_03_curiosidad_probar_sp_tipo: ['', [Validators.required]],
      g_04_probaria_sp_tipo: ['', [Validators.required]],
      g_05_posibilidad_probar_sp_tipo: ['', [Validators.required]],
      g_06_a_posibilidad_conseguir_marihuana_tipo: ['', [Validators.required]],
      g_06_b_posibilidad_conseguir_cocaina_tipo: ['', [Validators.required]],
      g_06_c_posibilidad_conseguir_basuco_tipo: ['', [Validators.required]],
      g_07_alguien_ofrecio_comprar_probar_sp_tipo: ['', [Validators.required]],
      g_01_a_num_familiares_consumen_sp_imp_tipo: ['', [Validators.required]],
      g_02_a_num_amigos_consumen_sp_imp_tipo: ['', [Validators.required]],
      g_08_a_ofrecieron_marihuana_imp_tipo: ['', [Validators.required]],
      g_08_b_ofrecieron_cocaina_imp_tipo: ['', [Validators.required]],
      g_08_c_ofrecieron_basuco_imp_tipo: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {

    this.obtenerListaDepartamentos()
    this.validoFormulario = false;
    this.registro = new Registro();
    this._strokedCircleChart('["--tb-success"]');
    this._distributedColumnChart('["--tb-primary", "--tb-success", "--tb-warning", "--tb-danger", "--tb-dark", "--tb-info"]')
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
    },
    error =>{
      console.log("Error al obtener lista de registros");
      console.log("Error:" + error);
    });
  }

  /**
   * Bootstrap tooltip form validation submit method
   */
  formSubmit() {
    this.formsubmit = true;
  }

  private limpiarFormulario() : void {
    this.gesPredictForm.reset()
    this.validoFormulario = false;
  }


  get f(){
    return this.gesPredictForm.controls;
  }


  predecir() : void {
    this.validoFormulario = true;
    if(this.gesPredictForm.invalid){
      return
    }
    this.loading = true;
    this.spinner.show()
    this.registro = this.gesPredictForm.value

    this._tesisService.predictUser(this.registro).subscribe(res => {
      console.log("Respuesta al predecirrrr:");
      console.log(res);
      this.prediccion = res.prediccion
      this.sig_prediccion = res.significado
      let array_data_valores_frec_consumo_marihuana: number[][] = [];
      let array_claves_nivel_edu: string[] = [];
      //console.log("Ayudaaaaaaaaaaaaaaaaaa");

      //console.log(typeof(res.caracteristicas));

      /*for (const clave in res.caracteristicas) {
        if (Object.prototype.hasOwnProperty.call(res.caracteristicas, clave)) {
          const value = res.caracteristicas[clave];
          console.log("Llave: " + clave);
          console.log("Valor: " + value);
        }
        console.log(clave);

      }*/
      for (let index = 0; index < res.caracteristicas.length; index++) {
        let dataObjeto = res.caracteristicas[index];
        let objCaracteristica:Caracteristica = new Caracteristica;
        objCaracteristica.clave = dataObjeto.clave
        this.data_claves_caracteristicas.push(dataObjeto.clave)
        objCaracteristica.porcentaje = dataObjeto.porcentaje
        this.data_porcentajes_caracteristicas.push(dataObjeto.porcentaje)
        objCaracteristica.significado = dataObjeto.significado
        this.caracteristicas.push(objCaracteristica)
      }
      console.log(this.caracteristicas);


      this.loading = false;
      this.spinner.hide();
      this.stepper.next();
      this.mostrarCaracteristicas = true;
      this.seleccionarTab(0);
      this._distributedColumnChart('["--tb-primary", "--tb-success", "--tb-warning", "--tb-danger", "--tb-dark", "--tb-info"]')
    })


    //let dataForm = JSON.stringify(this.gesPredictForm.value)
    //const departamento = this.gesPredictForm.get('departamento')?.value;
    //console.log(departamento);
  }

  public showSpinner(): void {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
  }
  public reiniciarForm(): void {
    /*this.mostrarCaracteristicas = false
    this.prediccion = ""
    this.caracteristicas = []

    if (this.stepper) {
      this.stepper.selectedIndex = 0;
    }*/

      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      const currentUrl = this.router.url;
      this.router.navigateByUrl(currentUrl).then(() => {
        this.router.navigated = false;
        this.router.navigate([this.router.url]);
      });

  }

  /**
  * Stroked Circular Gauge
  */
  private _strokedCircleChart(colors: any) {
    console.log("configurabdo")
    colors = this.getChartColorsArray(colors);
    console.log(this.tabActiva)
    if(this.tabActiva != -1){
      console.log("configurabdo v2")
      console.log(this.caracteristicas)
      console.log(Number(this.caracteristicas[this.tabActiva].porcentaje))
      this.strokedCircleChart = {
        series: [Number(this.caracteristicas[this.tabActiva].porcentaje)],
        chart: {
          height: 226,
          type: "radialBar",
          offsetY: -10,
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 135,
            dataLabels: {
              name: {
                fontSize: "16px",
                color: undefined,
                offsetY: 120,
              },
              value: {
                offsetY: 76,
                fontSize: "22px",
                color: undefined,
                formatter: function (val: any) {
                  return val + "%";
                },
              },
            },
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            shadeIntensity: 0.15,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 65, 91],
          },
        },
        stroke: {
          dashArray: 4,
        },
        labels: ["Porcentaje de incidencia"],
        colors: colors,
      };
    } else {
      this.strokedCircleChart = {
        series: [0],
        chart: {
          height: 226,
          type: "radialBar",
          offsetY: -10,
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 135,
            dataLabels: {
              name: {
                fontSize: "16px",
                color: undefined,
                offsetY: 120,
              },
              value: {
                offsetY: 76,
                fontSize: "22px",
                color: undefined,
                formatter: function (val: any) {
                  return val + "%";
                },
              },
            },
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            shadeIntensity: 0.15,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 65, 91],
          },
        },
        stroke: {
          dashArray: 4,
        },
        labels: ["Porcentaje de incidencia"],
        colors: colors,
      };
    }
  
    const attributeToMonitor = 'data-theme';

    const observer = new MutationObserver(() => {
     this._strokedCircleChart('["--tb-success"]');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [attributeToMonitor]
    });
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
  * Distributed Columns Charts
   */
  private _distributedColumnChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    if(this.tabActiva == 1){
      this.distributedColumnChart = {
        series: [{
          data: [21, 22, 10, 28, 16, 21, 13, 30]
        }],
        chart: {
          height: 350,
          type: 'bar',
          events: {
            click: function (chart: any, w: any, e: any) {
            }
          }
        },
        colors: colors,
        plotOptions: {
          bar: {
            columnWidth: '45%',
            distributed: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        xaxis: {
          categories: [
            ['John', 'Doe'],
            ['Joe', 'Smith'],
            ['Jake', 'Williams'],
            'Amber',
            ['Peter', 'Brown'],
            ['Mary', 'Evans'],
            ['David', 'Wilson'],
            ['Lily', 'Roberts'],
          ],
          labels: {
            style: {
              colors: colors,
              fontSize: '12px'
            }
          }
        }
      };
    } else {
      //let series: number[] = this.obtenerListaPorcentajes();
      console.log(this.data_claves_caracteristicas)
      console.log(this.data_porcentajes_caracteristicas)
      this.distributedColumnChart = {
        series: [{
          data: this.data_porcentajes_caracteristicas
        }],
        chart: {
          height: 350,
          type: 'bar',
          events: {
            click: function (chart: any, w: any, e: any) {
            }
          }
        },
        colors: colors,
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '25%',
            distributed: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        xaxis: {
          categories: this.data_claves_caracteristicas,
          labels: {
            style: {
              colors: colors,
              fontSize: '10px'
            }
          }
        }
      };
    }

    const attributeToMonitor = 'data-theme';

    const observer = new MutationObserver(() => {
      this._distributedColumnChart('["--tb-primary", "--tb-success", "--tb-warning", "--tb-danger", "--tb-dark", "--tb-info"]')
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [attributeToMonitor]
    });
  }

  private obtenerListaPorcentajes(): number[] {
    let ArrayPorcentajes: number[] = [];
    for (let index = 0; index < this.caracteristicas.length; index++) {
      const element = this.caracteristicas[index].porcentaje;
      if (typeof element === 'number') { // Comprueba si element es un número
        ArrayPorcentajes.push(element);
      }
    }
    return ArrayPorcentajes;
  }
}
