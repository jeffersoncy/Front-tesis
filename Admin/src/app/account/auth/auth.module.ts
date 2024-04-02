import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// page routing
import { AuthRoutingModule } from './auth-routing.module';

// otp module
import { NgOtpInputModule } from 'ng-otp-input';

// Component


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NgOtpInputModule
  ]
})
export class AuthModule { }
