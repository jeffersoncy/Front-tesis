import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';

// amCharts imports


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: [DecimalPipe]
})
export class IndexComponent {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  masInfo(){
    this.router.navigate(['/info'])
  }

  dirigirFormulario(){
    this.router.navigate(['/forms/tesis-predict'])
  }

}
