import { Component, OnInit, Inject } from '@angular/core';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogComponent } from '../../ui/dialog/dialog.component';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { SummaryService } from 'src/app/services/summary.service';

export interface PeriodicElement {
  name: string;
  hh: number;
  assigment: string;
}

export interface Logistic {
  name: string;
  contact: string;
  number: string;
  radio: string;
}

export interface ControlHazard {
  number: number;
  hazard: string;
  controls: string;
  required: string;
}

export interface Weather {
  time: string;
  description: string;
  temp: number;
  feels: number;
  presip: number;
  humidity: number;
  wind: number;
}

const weather_DATA: Weather[] = [
  { time: '10:00', description: 'Clody', temp: 68, feels: 68, presip: 15, humidity: 74, wind: 12 },
  { time: '10:00', description: 'Clody', temp: 68, feels: 68, presip: 15, humidity: 74, wind: 12 },
  { time: '10:00', description: 'Clody', temp: 68, feels: 68, presip: 15, humidity: 74, wind: 12 },
  { time: '10:00', description: 'Clody', temp: 68, feels: 68, presip: 15, humidity: 74, wind: 12 },
  { time: '10:00', description: 'Clody', temp: 68, feels: 68, presip: 15, humidity: 74, wind: 12 },
  { time: '10:00', description: 'Clody', temp: 68, feels: 68, presip: 15, humidity: 74, wind: 12 },
];

const Control_DATA: ControlHazard[] = [
  { number: 1, hazard: 'Buried Utilities', controls: 'When excavation work is within 5ft. of marked undergroud utility potholing is required.', required: 'Crew Member One' },
  { number: 2, hazard: 'Hazard A', controls: '1. Control 1', required: 'Name' },
  { number: 3, hazard: 'Hazard B', controls: '1. Control 2', required: 'Name' },
  { number: 4, hazard: 'Hazard C', controls: '1. Control 3', required: 'Name' },
  { number: 5, hazard: 'Hazard D', controls: '1. Control 4', required: 'Name' },
  { number: 6, hazard: 'Hazard E', controls: '1. Control 5', required: 'Name' },
];

const ELEMENT_DATA: PeriodicElement[] = [
  { hh: 1234, name: 'Keving Kanget', assigment: 'Operator' },
  { hh: 3456, name: 'Andrew Bolton', assigment: 'Spotter' },
  { hh: 3445, name: 'Ken Edler', assigment: 'Controller' },
  { hh: 4567, name: 'Jorge Escobo', assigment: 'Machine Operator' },
  { hh: 5676, name: 'Santo Ledzoros', assigment: 'General Laborer' },
  { hh: 8765, name: 'Victor Lazarro', assigment: 'Operator' },
  { hh: 4567, name: 'Sean Archer', assigment: 'Operator' },
];

const LOGISTIC_DATA: Logistic[] = [
  { contact: 'Primary Contact', name: 'Stephen McCaffrey', number: '555-233-3434', radio: 'Chanel #1' },
  { contact: 'Contact #2', name: 'Brian McCaffrey', number: '555-233-3434', radio: 'Chanel #1' },
  { contact: 'Contact #3', name: 'Donald Rimgale', number: '555-233-3434', radio: 'Chanel #1' },
];

@Component({
  selector: 'app-sta-summary',
  templateUrl: './sta-summary.component.html',
  styleUrls: ['./sta-summary.component.scss']
})
export class StaSummaryComponent implements OnInit {

  public settings: Settings;
  constructor(public appSettings: AppSettings, private summaryServ: SummaryService,
    public dialog: MatDialog) {
    
    this.settings = this.appSettings.settings;
    this.summaryServ.event.tools.subscribe(data => {
      if(this.saveType == "equipment"){
        this.equipment.push({name: data})
      } else {
        this.tools.push({toolname: data})
      }
    })
    this.getData();
   
  }
  
  equipment;
  tools;
  equipmentList;
  toolsList;
  equipmentChecked = {};
  toolsChecked = {};
  equipmentCheckedAll;
  toolsCheckedAll;
  saveType;

  openDialog(type): void {
    this.saveType = type;
    let selectedArray = [];
    if(this.saveType == "equipment"){
      for(let item of this.equipmentList){
        if (item.name)
        selectedArray.push(item.name)
      }
    } else {
      for(let item of this.toolsList){
        if (item.toolname)
        selectedArray.push(item.toolname)
      }
    }

    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {array: selectedArray}
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });

    console.log(selectedArray)
  }

  getData(){
    this.summaryServ.getEquipment().subscribe(data => {
      this.equipment = data;
      console.log(this.equipment);
    })

    this.summaryServ.getStatools().subscribe(data => {
      this.tools = data;
      console.log(this.tools);
    })

    this.summaryServ.getEquipmentList().subscribe(data => {
      this.equipmentList = data;
      console.log(this.equipmentList, 'equipmentList');
    })

    this.summaryServ.getStatoolsList().subscribe(data => {
      this.toolsList = data;
      console.log(this.toolsList, 'toolsList');
    })
  }
  
  checkEquipmentAll(value){
    let arrays = Object.keys(this.equipment);
    for(let i = 0; i <= arrays.length; i++ ){
      this.equipmentChecked[i] = value;
    }
  }

  checkToolsAll(value){
    let arrays = Object.keys(this.tools);
    for(let i = 0; i <= arrays.length; i++ ){
      this.toolsChecked[i] = value;
    }
  }

  ToCheckedEquipment(value){
    if (!value){
      this.equipmentCheckedAll = false;
    }
  }

  ToCheckedTools(value){
    if (!value){
      this.toolsCheckedAll = false;
    }
  }

  removeEquipment(){
    let count = 0;
    let arrays = Object.keys(this.equipmentChecked);
    for (const key of arrays) {
      if(this.equipmentChecked[key]){
        this.equipment.splice(+key-count, 1);
        count += 1;
      }
    }
    this.equipmentChecked = {};
  }

  removeTools(){
    let count = 0;
    let arrays = Object.keys(this.toolsChecked);
    for (const key of arrays) {
      if(this.toolsChecked[key]){
        this.tools.splice(+key-count, 1);
        count += 1;
      }
    }
    this.toolsChecked = {};
  }

  ActionsData = ['Actions 1', 'Actions 2', 'Actions 3']

  displayedColumns: string[] = ['hh', 'name', 'assigment'];

  displayedColumnsLogistic: string[] = ['contact', 'name', 'number', 'radio'];

  dataSource = ELEMENT_DATA;

  dataSourceLogistic = LOGISTIC_DATA;

  displayedColumnsControl: string[] = ['number', 'hazard', 'controls', 'required'];

  displayedColumnsWeather: string[] = ['time', 'description', 'temp', 'feels', 'presip', 'humidity', 'wind'];

  dataSourceControl = Control_DATA;

  dataSourceWeather = weather_DATA;

  ngOnInit() {
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  template: `<h1 mat-dialog-title></h1>
  <div mat-dialog-content>
    <p>Add element</p>

    <form class="example-form">
      <mat-form-field style="width: 100%;" class="example-full-width">
        <input [(ngModel)]="text" type="text" placeholder="" aria-label="Number" matInput [formControl]="myControl" [matAutocomplete]="auto">
        <mat-autocomplete #auto="matAutocomplete">
        <mat-option *ngFor="let option of filteredOptions | async" [value]="option">
            {{option}}
          </mat-option>
        </mat-autocomplete>
      </mat-form-field>
    </form>

  </div>
  <div mat-dialog-actions>
    <button mat-button (click)="onNoClick()">No Thanks</button>
    <button mat-button (click)="save()">Ok</button>
  </div>`,
})

export class DialogOverviewExampleDialog implements OnInit {

  myControl = new FormControl();
  options: string[] = this.data.array;
  filteredOptions: Observable<string[]>;

  

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>, 
    private summaryServ: SummaryService,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  text = '';

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
      console.log(this.data)
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  save() {
    this.summaryServ.event.tools.emit(this.text);
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
