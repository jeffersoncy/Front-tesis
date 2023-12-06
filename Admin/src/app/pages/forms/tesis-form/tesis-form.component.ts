import { Component, OnInit } from '@angular/core';
import { TesisService } from 'src/app/core/services/tesis.service';

import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { chatMessagesData } from './data';

@Component({
  selector: 'app-tesis-form',
  templateUrl: './tesis-form.component.html',
  styleUrls: ['./tesis-form.component.scss']
})
export class TesisFormComponent implements OnInit{

  selectedAccount = 'This is a placeholder';


  breadCrumbItems!: Array<{}>;

  tooltipvalidationform!: UntypedFormGroup;
  submit!: boolean;
  formsubmit!: boolean;

  constructor(
    private _tesisService:TesisService,
    private formBuilder: UntypedFormBuilder
  ){}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Forms' },
      { label: 'Form Advanced', active: true }
    ];

    this.tooltipvalidationform = this.formBuilder.group({
      city: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      state: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
    });

  }

  /**
   * Bootstrap tooltip form validation submit method
   */
  formSubmit() {
    this.formsubmit = true;
  }

  /**
   * returns tooltip validation form
   */
  get formData() {
    return this.tooltipvalidationform.controls;
  }
}
