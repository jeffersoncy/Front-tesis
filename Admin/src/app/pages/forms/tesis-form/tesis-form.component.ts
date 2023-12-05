import { Component, OnInit } from '@angular/core';
import { TesisService } from 'src/app/core/services/tesis.service';

import { chatMessagesData } from './data';

@Component({
  selector: 'app-tesis-form',
  templateUrl: './tesis-form.component.html',
  styleUrls: ['./tesis-form.component.scss']
})
export class TesisFormComponent implements OnInit{

  selectedAccount = 'This is a placeholder';
  public Default = chatMessagesData;

  breadCrumbItems!: Array<{}>;
  selectedCountry: any;
  selectedFlag: any;

  constructor(
    private _tesisService:TesisService
  ){}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Forms' },
      { label: 'Form Advanced', active: true }
    ];

    this.selectedCountry = {
      "flagImg": "assets/images/flags/us.svg",
      "countryName": "United States of America",
      "countryCode": "+1"
    }

    this.selectedFlag = {
      "flagImg": "assets/images/flags/us.svg",
      "countryName": "United States of America",
      "countryCode": "+1"
    }
  }

  selectValue(data: any) {
    this.selectedCountry = data
  }

  selectCode(data: any) {
    this.selectedFlag = data
  }

  selectEvent(item: any) { }
  onChangeSearch(search: string) { }
  onFocused(e: any) { }
}
