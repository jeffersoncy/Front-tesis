import { Component, OnInit, ElementRef } from '@angular/core';
import { Registro } from 'src/app/core/models/registro';
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
    this.cargarRegistros();
    this.cargarConteoNivelRiesgo('todos');
    this.cargarConteoDepto();
    this.cargarConteoNivelEduXFrecConsumoMarihuana();
    this.cargarConteoNivelEduXFrecConsumoCocaina();
    this.cargarConteoNivelEduXFrecConsumoBazuco();
    // Chart Color Data Get Function
    this._basicBarChart('["--tb-success"]');
    this._customDataLabelsChart('["--tb-primary", "--tb-secondary", "--tb-success", "--tb-info", "--tb-warning", "--tb-danger", "--tb-dark", "--tb-primary", "--tb-success", "--tb-secondary"]');
    this._stackedBarChart('["--tb-primary", "--tb-success", "--tb-warning", "--tb-danger", "--tb-info"]');
    this._stacked100BarChartMarihuana('["--tb-dark", "--tb-success", "--tb-warning", "--tb-danger", "--tb-info"]');
    this._stacked100BarChartCocaina('["--tb-dark", "--tb-success", "--tb-warning", "--tb-danger", "--tb-info"]');
    this._stacked100BarChartBazuco('["--tb-dark", "--tb-success", "--tb-warning", "--tb-danger", "--tb-info"]');
    this._barWithNegativeChart('["--tb-primary", "--tb-success"]');
    this._barWithMarkersChart('["--tb-success", "--tb-primary"]');
    this._reversedBarChart('["--tb-info"]');
    this._patternedChart('["--tb-primary", "--tb-success", "--tb-warning", "--tb-danger"]');
    this._groupedBarChart('["--tb-primary", "--tb-success"]');
    this._barWithImageChart('["--tb-success"]');
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
        text: "Custom DataLabels",
        align: "center",
        floating: true,
        style: {
          fontWeight: 600,
        },
      },
      subtitle: {
        text: "Category Names as DataLabels inside bars",
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
      /*series: [{
        name: "Marine Sprite",
        data: [44, 55, 41, 37, 22, 43, 21],
      },
      {
        name: "Striking Calf",
        data: [53, 32, 33, 52, 13, 43, 32],
      },
      {
        name: "Tank Picture",
        data: [12, 17, 11, 9, 15, 11, 20],
      },
      {
        name: "Bucket Slope",
        data: [9, 7, 5, 8, 6, 9, 4],
      },
      {
        name: "Reborn Kid",
        data: [25, 12, 19, 32, 25, 24, 10],
      },*/
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
    this.stacked100BarChartMarihuana = {
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
      {
        name: this.data_claves_nivel_edu_marihuana[5],
        data: this.data_valores_frec_consumo_marihuana[5],
      },
      {
        name: this.data_claves_nivel_edu_marihuana[6],
        data: this.data_valores_frec_consumo_marihuana[6],
      },
      {
        name: this.data_claves_nivel_edu_marihuana[7],
        data: this.data_valores_frec_consumo_marihuana[7],
      },
      ],
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
        text: "100% Stacked Bar",
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
  * Stacked 100 Bar Charts Cocaina
  */
  private _stacked100BarChartCocaina(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.stacked100BarChartCocaina = {
      series: [{
        name: this.data_claves_nivel_edu_cocaina[0],
        data: this.data_valores_frec_consumo_cocaina[0],
      },
      {
        name: this.data_claves_nivel_edu_cocaina[1],
        data: this.data_valores_frec_consumo_cocaina[1],
      },
      {
        name: this.data_claves_nivel_edu_cocaina[2],
        data: this.data_valores_frec_consumo_cocaina[2],
      },
      {
        name: this.data_claves_nivel_edu_cocaina[3],
        data: this.data_valores_frec_consumo_cocaina[3],
      },
      {
        name: this.data_claves_nivel_edu_cocaina[4],
        data: this.data_valores_frec_consumo_cocaina[4],
      },
      {
        name: this.data_claves_nivel_edu_cocaina[5],
        data: this.data_valores_frec_consumo_cocaina[5],
      },
      {
        name: this.data_claves_nivel_edu_cocaina[6],
        data: this.data_valores_frec_consumo_cocaina[6],
      },
      {
        name: this.data_claves_nivel_edu_cocaina[7],
        data: this.data_valores_frec_consumo_cocaina[7],
      },
      ],
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
        text: "100% Stacked Bar",
        style: {
          fontWeight: 600,
        },
      },
      xaxis: {
        categories: this.data_claves_frec_consumo_cocaina, 
        //[2008, 2009, 2010, 2011, 2012, 2013, 2014],
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
  * Stacked 100 Bar Charts Bazuco
  */
  private _stacked100BarChartBazuco(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.stacked100BarChartBazuco = {
      series: [{
        name: this.data_claves_nivel_edu_bazuco[0],
        data: this.data_valores_frec_consumo_bazuco[0],
      },
      {
        name: this.data_claves_nivel_edu_bazuco[1],
        data: this.data_valores_frec_consumo_bazuco[1],
      },
      {
        name: this.data_claves_nivel_edu_bazuco[2],
        data: this.data_valores_frec_consumo_bazuco[2],
      },
      {
        name: this.data_claves_nivel_edu_bazuco[3],
        data: this.data_valores_frec_consumo_bazuco[3],
      },
      {
        name: this.data_claves_nivel_edu_bazuco[4],
        data: this.data_valores_frec_consumo_bazuco[4],
      },
      {
        name: this.data_claves_nivel_edu_bazuco[5],
        data: this.data_valores_frec_consumo_bazuco[5],
      },
      {
        name: this.data_claves_nivel_edu_bazuco[6],
        data: this.data_valores_frec_consumo_bazuco[6],
      },
      {
        name: this.data_claves_nivel_edu_bazuco[7],
        data: this.data_valores_frec_consumo_bazuco[7],
      },
      ],
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
        text: "100% Stacked Bar",
        style: {
          fontWeight: 600,
        },
      },
      xaxis: {
        categories: this.data_claves_frec_consumo_bazuco, 
        //[2008, 2009, 2010, 2011, 2012, 2013, 2014],
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
  * Bar with Negative Values
  */
  private _barWithNegativeChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.barWithNegativeChart = {
      series: [{
        name: "Males",
        data: [
          0.4,
          0.65,
          0.76,
          0.88,
          1.5,
          2.1,
          2.9,
          3.8,
          3.9,
          4.2,
          4,
          4.3,
          4.1,
          4.2,
          4.5,
          3.9,
          3.5,
          3,
        ],
      },
      {
        name: "Females",
        data: [
          -0.8,
          -1.05,
          -1.06,
          -1.18,
          -1.4,
          -2.2,
          -2.85,
          -3.7,
          -3.96,
          -4.22,
          -4.3,
          -4.4,
          -4.1,
          -4,
          -4.1,
          -3.4,
          -3.1,
          -2.8,
        ],
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
        min: -5,
        max: 5,
        title: {
          text: "Age",
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
            return Math.abs(val) + "%";
          },
        },
      },
      title: {
        text: "Mauritius population pyramid 2011",
        style: {
          fontWeight: 600,
        },
      },
      xaxis: {
        categories: [
          "85+",
          "80-84",
          "75-79",
          "70-74",
          "65-69",
          "60-64",
          "55-59",
          "50-54",
          "45-49",
          "40-44",
          "35-39",
          "30-34",
          "25-29",
          "20-24",
          "15-19",
          "10-14",
          "5-9",
          "0-4",
        ],
        title: {
          text: "Percent",
        },
        labels: {

        },
      },
    };
  }

  /**
  * Bar with Markers
  */
  private _barWithMarkersChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.barWithMarkersChart = {
      series: [{
        name: "Actual",
        data: [{
          x: "2011",
          y: 12,
          goals: [{
            name: "Expected",
            value: 14,
            strokeWidth: 5,
            strokeColor: "#564ab1",
          },],
        },
        {
          x: "2012",
          y: 44,
          goals: [{
            name: "Expected",
            value: 54,
            strokeWidth: 5,
            strokeColor: "#564ab1",
          },],
        },
        {
          x: "2013",
          y: 54,
          goals: [{
            name: "Expected",
            value: 52,
            strokeWidth: 5,
            strokeColor: "#564ab1",
          },],
        },
        {
          x: "2014",
          y: 66,
          goals: [{
            name: "Expected",
            value: 65,
            strokeWidth: 5,
            strokeColor: "#564ab1",
          },],
        },
        {
          x: "2015",
          y: 81,
          goals: [{
            name: "Expected",
            value: 66,
            strokeWidth: 5,
            strokeColor: "#564ab1",
          },],
        },
        {
          x: "2016",
          y: 67,
          goals: [{
            name: "Expected",
            value: 70,
            strokeWidth: 5,
            strokeColor: "#564ab1",
          },],
        },
        ],
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
      colors: colors,
      dataLabels: {
        formatter: function (val: any) {
          return val.toString();
        }
      },
      legend: {
        show: true,
        showForSingleSeries: true,
        customLegendItems: ["Actual", "Expected"],
        markers: {
          fillColors: ["#0AB39C", "#0AB39C"],
        },
      },
    };
  }

  /**
  * Reversed Bar Chart
  */
  private _reversedBarChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.reversedBarChart = {
      series: [{
        data: [400, 430, 448, 470, 540, 580, 690],
      },],
      chart: {
        type: "bar",
        height: 350,
        toolbar: {
          show: false,
        },
      },
      annotations: {
        xaxis: [{
          x: 500,
          borderColor: "#299CDB",
          label: {
            borderColor: "#299CDB",
            style: {
              color: "#fff",
              background: "#299CDB",
            },
            text: "X annotation",
          },
        },],
        yaxis: [{
          y: "July",
          y2: "September",
          label: {
            text: "Y annotation",
          },
        },],
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: true,
      },
      xaxis: {
        categories: [
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
      },
      grid: {
        xaxis: {
          lines: {
            show: true,
          },
        },
      },
      yaxis: {
        reversed: true,
        axisTicks: {
          show: true,
        },
      },
      colors: colors
    };
  }

  /**
 * Patterned Chart
 */
  private _patternedChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.patternedChart = {
      series: [{
        name: "Marine Sprite",
        data: [44, 55, 41, 37, 22, 43, 21],
      },
      {
        name: "Striking Calf",
        data: [53, 32, 33, 52, 13, 43, 32],
      },
      {
        name: "Tank Picture",
        data: [12, 17, 11, 9, 15, 11, 20],
      },
      {
        name: "Bucket Slope",
        data: [9, 7, 5, 8, 6, 9, 4],
      },
      ],
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        dropShadow: {
          enabled: true,
          blur: 1,
          opacity: 0.25,
        },
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: "60%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 2,
      },
      title: {
        text: "Compare Sales Strategy",
        style: {
          fontWeight: 600,
        },
      },
      xaxis: {
        categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
      },
      yaxis: {
        title: {
          text: undefined,
        },
      },
      tooltip: {
        shared: false,
        y: {
          formatter: function (val: any) {
            return val + "K";
          },
        },
      },
      fill: {
        type: "pattern",
        opacity: 1,
        pattern: {
          style: ["circles", "slantedLines", "verticalLines", "horizontalLines"], // string or array of strings
        },
      },
      states: {
        hover: {

        },
      },
      legend: {
        position: "right",
        offsetY: 40,
      },
      colors: colors,
    };
  }

  /**
  * Grouped Bar Chart
  */
  private _groupedBarChart(colors: any) {
    console.log('Valor de miVariable:', typeof this.data_nivel_tipo);
    colors = this.getChartColorsArray(colors);
    this.groupedBarChart = {
      series: [{
        //data: this.data_nivel_tipo,
        data: [44, 55, 41, 64, 22, 43, 21],
      },
      {
        data: [53, 32, 33, 52, 13, 44, 32],
      },
      ],
      chart: {
        type: "bar",
        height: 410,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: "top",
          },
        },
      },
      dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
          fontSize: "12px",
          colors: ["#fff"],
        },
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["#fff"],
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      xaxis: {
        categories: [2001, 2002, 2003, 2004, 2005, 2006, 2007],
      },
      colors: colors,
    };
  }

  /**
  * Bar with Images
  */
  private _barWithImageChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.barWithImageChart = {
      series: [{
        name: "coins",
        data: [
          2,
          4,
          3,
          4,
          3,
          5,
          5,
          6.5,
          6,
          5,
          4,
          5,
          8,
          7,
          7,
          8,
          8,
          10,
          9,
          9,
          12,
          12,
          11,
          12,
          13,
          14,
          16,
          14,
          15,
          17,
          19,
          21,
        ],
      },],
      chart: {
        type: "bar",
        height: 410,
        animations: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: "100%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        colors: ["#fff"],
        width: 0.2,
      },
      labels: Array.apply(null).map(function (el, index) {
        return index + 1;
      }),
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
        },
        title: {
          text: "Weight",
        },
      },
      grid: {
        position: "back",
      },
      title: {
        text: "Paths filled by clipped image",
        align: "right",
        offsetY: 30,
        style: {
          fontWeight: 600,
        },
      },
      fill: {
        type: "image",
        opacity: .87,
        image: {
          src: ["../../../../../assets/images/small/img-4.jpg"],
          width: 466,
          height: 406
        }
      },
      colors: colors
    };
  }

  cargarConteoDepto(){
    this._tesisService.getConteoDepartamentos().subscribe(res =>{
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


  cargarConteoNivelEduXFrecConsumoMarihuana(){
    this._tesisService.getConteoNivelEduXFrecConsumoMarihuana().subscribe(res =>{
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
  
      console.log('Array agrupado por clave: ', arrayAgrupadoPorClave);
      //console.log('Valor de miVariable data frecuencia consumo tipo: ', array_data_claves_frec_consumo_marihuana);
      console.log('Valor de miVariable data frecuencia consumo numeros: ', array_data_valores_frec_consumo_marihuana);
      //console.log('Valor de miVariable data nivel educativo tipo: ', array_claves_unicas_nivel_edu);
      
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


  cargarConteoNivelEduXFrecConsumoCocaina(){
    this._tesisService.getConteoNivelEduXFrecConsumoCocaina().subscribe(res =>{
      let array_data_claves_frec_consumo_cocaina = [];
      let array_data_valores_frec_consumo_cocaina: number[][] = [];
      let array_claves_nivel_edu: string[] = [];

      for (let nivelEdu in res) {
        if (res.hasOwnProperty(nivelEdu)) {
          array_data_claves_frec_consumo_cocaina.push(nivelEdu);
          array_data_valores_frec_consumo_cocaina.push(Object.values(res[nivelEdu]));
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
          objetoAgrupadoPorClave[clave].push(...array_data_valores_frec_consumo_cocaina.map(valores => valores[indiceClave]));
        } else {
          // Si no existe, crear un nuevo array con los valores
          objetoAgrupadoPorClave[clave] = array_data_valores_frec_consumo_cocaina.map(valores => valores[indiceClave]);
        }
      });

      // Convertir el objeto a un array de arrays
      let arrayAgrupadoPorClave = Object.values(objetoAgrupadoPorClave);
  
      //console.log('Array agrupado por clave: ', arrayAgrupadoPorClave);
      //console.log('Valor de miVariable data frecuencia consumo tipo: ', array_data_claves_frec_consumo_marihuana);
      //console.log('Valor de miVariable data frecuencia consumo numeros: ', array_data_valores_frec_consumo_cocaina);
      //console.log('Valor de miVariable data nivel educativo tipo: ', array_claves_unicas_nivel_edu);
      
      this.data_claves_frec_consumo_cocaina = array_data_claves_frec_consumo_cocaina;
      this.data_claves_nivel_edu_cocaina = array_claves_unicas_nivel_edu;
      this.data_valores_frec_consumo_cocaina = arrayAgrupadoPorClave;

      this._stacked100BarChartCocaina('["--tb-primary", "--tb-success", "--tb-warning", "--tb-danger", "--tb-info", "--tb-dark", "--tb-gray", "--tb-purple"]');
    },
    error =>{
      swal.fire('Error', 'Error cargando los datos de nivel educativo por frecuencia consumo cocaina:' + error, 'error');
    });
  }


  cargarConteoNivelEduXFrecConsumoBazuco(){
    this._tesisService.getConteoNivelEduXFrecConsumoBazuco().subscribe(res =>{
      let array_data_claves_frec_consumo_bazuco = [];
      let array_data_valores_frec_consumo_bazuco: number[][] = [];
      let array_claves_nivel_edu: string[] = [];

      for (let nivelEdu in res) {
        if (res.hasOwnProperty(nivelEdu)) {
          array_data_claves_frec_consumo_bazuco.push(nivelEdu);
          array_data_valores_frec_consumo_bazuco.push(Object.values(res[nivelEdu]));
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
          objetoAgrupadoPorClave[clave].push(...array_data_valores_frec_consumo_bazuco.map(valores => valores[indiceClave]));
        } else {
          // Si no existe, crear un nuevo array con los valores
          objetoAgrupadoPorClave[clave] = array_data_valores_frec_consumo_bazuco.map(valores => valores[indiceClave]);
        }
      });

      // Convertir el objeto a un array de arrays
      let arrayAgrupadoPorClave = Object.values(objetoAgrupadoPorClave);
  
      //console.log('Array agrupado por clave: ', arrayAgrupadoPorClave);
      //console.log('Valor de miVariable data frecuencia consumo tipo: ', array_data_claves_frec_consumo_marihuana);
      //console.log('Valor de miVariable data frecuencia consumo numeros: ', array_data_valores_frec_consumo_bazuco);
      //console.log('Valor de miVariable data nivel educativo tipo: ', array_claves_unicas_nivel_edu);
      
      this.data_claves_frec_consumo_bazuco = array_data_claves_frec_consumo_bazuco;
      this.data_claves_nivel_edu_bazuco = array_claves_unicas_nivel_edu;
      this.data_valores_frec_consumo_bazuco = arrayAgrupadoPorClave;

      this._stacked100BarChartBazuco('["--tb-primary", "--tb-success", "--tb-warning", "--tb-danger", "--tb-info", "--tb-dark", "--tb-gray", "--tb-purple"]');
    },
    error =>{
      swal.fire('Error', 'Error cargando los datos de nivel educativo por frecuencia consumo bazuco:' + error, 'error');
    });
  }
}
