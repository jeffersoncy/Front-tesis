import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Module
import { FormsRoutingModule } from './forms-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

// chart
import { NgApexchartsModule } from "ng-apexcharts";

// Auto Complate
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
// Editer
import { NgxEditorModule } from 'ngx-editor';


// Mask
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

// Select Droup down
import { NgSelectModule } from '@ng-select/ng-select';
import { UiSwitchModule } from 'ngx-ui-switch';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxSliderModule } from 'ngx-slider-v2';

// Color Picker
import { ColorPickerModule } from 'ngx-color-picker';

// ngx-bootstrap Component

// dropzone
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

// FlatPicker
import { FlatpickrModule } from 'angularx-flatpickr';

//Wizard
import { CdkStepperModule } from '@angular/cdk/stepper';
import { NgStepperModule } from 'angular-ng-stepper';

// Ck Editer
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { NgxSpinnerModule } from "ngx-spinner";

//Tabs
import { TabsModule } from 'ngx-bootstrap/tabs';

// component
import { TesisFormComponent } from './tesis-form/tesis-form.component';

import { GoogleChartsModule } from 'angular-google-charts';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { CollapseModule } from 'ngx-bootstrap/collapse';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
   url: 'https://httpbin.org/post',
   maxFilesize: 50,
   acceptedFiles: 'image/*'
 };

@NgModule({
  declarations: [
    TesisFormComponent
  ],
  imports: [
    NgxSpinnerModule.forRoot(),
    CommonModule,
    FormsRoutingModule,
    SharedModule,
    NgSelectModule,
    FormsModule,
    TabsModule.forRoot(),
    ReactiveFormsModule,
    UiSwitchModule,
    TimepickerModule,
    BsDatepickerModule,
    ColorPickerModule,
    AutocompleteLibModule,
    NgxMaskDirective,
    NgxMaskPipe,
    NgxSliderModule,
    CdkStepperModule,
    NgStepperModule,
    CKEditorModule,
    NgxEditorModule,
    BsDropdownModule.forRoot(),
    DropzoneModule,
    FlatpickrModule.forRoot(),
    GoogleChartsModule.forRoot(),
    NgApexchartsModule,
    AccordionModule.forRoot(),
    CollapseModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    provideNgxMask(),
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ]
})
export class FormModule { }
