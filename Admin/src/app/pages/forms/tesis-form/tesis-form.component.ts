import { Component, OnInit } from '@angular/core';
import { TesisService } from 'src/app/core/services/tesis.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Registro } from '../../../core/models/registro';
import { Departamento } from 'src/app/core/models/departamento';

@Component({
  selector: 'app-tesis-form',
  templateUrl: './tesis-form.component.html',
  styleUrls: ['./tesis-form.component.scss']
})
export class TesisFormComponent implements OnInit{

  selectedAccount = 'This is a placeholder';

  public validoFormulario !: boolean;
  public registro!:Registro;
  public listaDepartamentos !: Array<Departamento>;

  public gesPredictForm !: FormGroup;

  submit!: boolean;
  formsubmit!: boolean;

  constructor(
    private _tesisService:TesisService,
    private formBuilder: FormBuilder
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
    this.registro = this.gesPredictForm.value
    //let dataForm = JSON.stringify(this.gesPredictForm.value)
    //const departamento = this.gesPredictForm.get('departamento')?.value;
    //console.log(departamento);
    console.log(this.registro);


  }
}
