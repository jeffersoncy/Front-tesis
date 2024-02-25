import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// page routing
import { AuthRoutingModule } from './auth-routing.module';
import { ErrorsModule } from './errors/errors.module';

// otp module
import { NgOtpInputModule } from 'ng-otp-input';

// Component
import { SuccessMsgComponent } from './success-msg/success-msg.component';
import { TwostepComponent } from './twostep/twostep.component';

@NgModule({
  declarations: [
    SuccessMsgComponent,
    TwostepComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ErrorsModule,
    NgOtpInputModule
  ]
})
export class AuthModule { }
