import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// component
import { SuccessMsgComponent } from './success-msg/success-msg.component';
import { TwostepComponent } from './twostep/twostep.component';

const routes: Routes = [
  {
    path: 'success-msg',
    component: SuccessMsgComponent,
  },
  {
    path: 'twostep',
    component: TwostepComponent,
  },
  {
    path: 'errors', loadChildren: () => import('./errors/errors.module').then(m => m.ErrorsModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
