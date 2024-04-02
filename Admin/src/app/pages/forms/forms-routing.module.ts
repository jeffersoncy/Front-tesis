import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TesisFormComponent } from './tesis-form/tesis-form.component';

const routes: Routes = [
  {
    path: 'tesis-predict',
    component: TesisFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule { }
