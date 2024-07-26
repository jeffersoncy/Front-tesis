import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'ngx-bootstrap/accordion';


// page route
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CollapseModule } from 'ngx-bootstrap/collapse';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    AccordionModule.forRoot(),
    CollapseModule.forRoot(),

  ]
})
export class PagesModule { }
