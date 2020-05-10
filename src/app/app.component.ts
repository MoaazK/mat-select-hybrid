import { Component, OnInit, VERSION } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

interface Territory {
  state: string;
  cityID: number;
  cityName: string;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  version = VERSION;
  exampleForm: FormGroup;
  options: Array<Territory>;

  constructor(private formBuilder: FormBuilder) {
    this.options = this.getOptions();
  }

  ngOnInit() {
    this.initFormGroup();
  }

  initFormGroup() {
    this.exampleForm = this.formBuilder.group({
      singleSelect: [''],
      singleSelectGroup: [''],
      multiSelect: [''],
      multiSelectGroup: ['']
    });
  }

  getOptions(): Territory[] {
    return [
      { state: 'Alabama', cityID: 1, cityName: 'Alexander City' },
      { state: 'Alabama', cityID: 2, cityName: 'Andalusia' },
      { state: 'Alabama', cityID: 3, cityName: 'Anniston' },
      { state: 'Alabama', cityID: 4, cityName: 'Athens' },
      { state: 'Alabama', cityID: 5, cityName: 'Atmore' },
      { state: 'Alabama', cityID: 6, cityName: 'Auburn' },
      { state: 'Illinois', cityID: 7, cityName: 'Alton' },
      { state: 'Illinois', cityID: 8, cityName: 'Arlingotn Heights' },
      { state: 'Illinois', cityID: 9, cityName: 'Arthur' },
      { state: 'Illinois', cityID: 10, cityName: 'Aurora' },
      { state: 'Illinois', cityID: 11, cityName: 'Belleville' },
      { state: 'Illinois', cityID: 12, cityName: 'Belvidere' },
      { state: 'Illinois', cityID: 13, cityName: 'Bloomington' },
      { state: 'Illinois', cityID: 14, cityName: 'Brookfield' },
      { state: 'Illinois', cityID: 15, cityName: 'Cahokia' },
      { state: 'Illinois', cityID: 16, cityName: 'Cairo' },
      { state: 'Illinois', cityID: 17, cityName: 'Calumet City' },
      { state: 'Illinois', cityID: 18, cityName: 'Canton' },
      { state: 'New Jersey', cityID: 19, cityName: 'Asbury Park' },
      { state: 'New Jersey', cityID: 20, cityName: 'Atlantic City' },
      { state: 'New Jersey', cityID: 21, cityName: 'Bayonne' },
      { state: 'New Jersey', cityID: 22, cityName: 'Bloomfield' },
      { state: 'New Jersey', cityID: 23, cityName: 'Bordentown' },
      { state: 'New Jersey', cityID: 24, cityName: 'Bound Brook' },
      { state: 'New Jersey', cityID: 25, cityName: 'Bridgeton' },
      { state: 'New Jersey', cityID: 26, cityName: 'Burlington' },
      { state: 'New Jersey', cityID: 27, cityName: 'Caldwell' },
      { state: 'New Jersey', cityID: 28, cityName: 'Camden' },
      { state: 'New Jersey', cityID: 29, cityName: 'Cape May' },
      { state: 'New Jersey', cityID: 30, cityName: 'Clifton' },
      { state: 'New Jersey', cityID: 31, cityName: 'Cranford' },
      { state: 'New Jersey', cityID: 32, cityName: 'East Orange' },
      { state: 'New Jersey', cityID: 33, cityName: 'Edison' },
      { state: 'New Jersey', cityID: 34, cityName: 'Elizabeth' },
      { state: 'New Jersey', cityID: 35, cityName: 'Englewood' },
      { state: 'New Jersey', cityID: 36, cityName: 'Fort Lee' },
      { state: 'New Jersey', cityID: 37, cityName: 'Glassboro' },
      { state: 'New Jersey', cityID: 38, cityName: 'Hackensack' },
      { state: 'New Jersey', cityID: 39, cityName: 'Haddonfield' },
      { state: 'New Jersey', cityID: 40, cityName: 'Hoboken' },
      { state: 'New Jersey', cityID: 41, cityName: 'Irvington' },
      { state: 'New Jersey', cityID: 42, cityName: 'Jersey City' },
      { state: 'New Jersey', cityID: 43, cityName: 'Lakehurst' }
    ];
  }
}
