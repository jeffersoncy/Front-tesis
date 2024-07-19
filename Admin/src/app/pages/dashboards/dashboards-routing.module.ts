import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component
import { IndexComponent } from './index/index.component';
import { TesisGraphsComponent } from './tesis-graphs/tesis-graphs.component';
import { TesisMapsComponent } from './tesis-maps/tesis-maps.component';
import { InfoAppComponent } from './info-app/info-app.component';


const routes: Routes = [
  {
    path: "",
    component: IndexComponent
  },
  {
    path: "info-app",
    component: InfoAppComponent
  },
  {
    path: "tesis-graphs",
    component: TesisGraphsComponent
  },
  {
    path: "tesis-maps",
    component: TesisMapsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardsRoutingModule { }
