import { Component, OnInit, Inject } from '@angular/core';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogComponent } from '../../ui/dialog/dialog.component';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SummaryService } from 'src/app/services/summary.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

export interface PeriodicElement {
  name: string;
  hardhatnumber: number;
  assignment: string;
}

export interface PeriodicElement2 {
  name: string;
  hardhatnumber: number;
  assignment: string;
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

let ELEMENT_DATA: PeriodicElement[] = [
  // { hardhatnumber: 1234, assignment: 'Keving Kanget', name: 'Operator' },
];

let ELEMENT_DATA2: PeriodicElement2[] = [
  // { hardhatnumber: 1234, assignment: 'Keving Kanget', name: 'Operator' },
];

const LOGISTIC_DATA: Logistic[] = [
  // { contact: 'Primary Contact', name: 'Stephen McCaffrey', number: '555-233-3434', radio: 'Chanel #1' },
];



@Component({
  selector: 'app-new-sta',
  templateUrl: './new-sta.component.html',
  styleUrls: ['./new-sta.component.scss']
})
export class NewStaComponent implements OnInit {

  public settings: Settings;
  constructor(
    public appSettings: AppSettings,
    private summaryServ: SummaryService,
    public dialog: MatDialog,
    public router: Router,
  ) {

    this.settings = this.appSettings.settings;
    this.summaryServ.event.tools.subscribe(data => {
      if (this.saveType == "equipment") {
        this.equipment.push({ name: data })
      } else if (this.saveType == "tools") {
        this.tools.push({ toolname: data })
      } else if (this.saveType == "operations") {
        this.OperationsData.push({ name: data })
      } else if (this.saveType == "activity") {
        this.activityName = data;
      } else if (this.saveType == "activity2") {
        this.activityName2 = data;
      } else if (this.saveType == "activityCrew") {
        console.log(data);
        ELEMENT_DATA.push(data);
        this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
      } else if (this.saveType == "activityCrew2") {
        console.log(data);
        ELEMENT_DATA2.push(data);
        this.dataSource2 = new MatTableDataSource<PeriodicElement2>(ELEMENT_DATA2);
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
  lifeCriticalChecked = {};
  equipmentCheckedAll;
  toolsCheckedAll;
  saveType;
  activityData;
  activityName;
  ActivityCrew;
  instructions = false;
  activityData2;
  activityName2;
  ActivityCrew2;

  OperationsData = [];
  criticalOperationsData;

  dialogRef;

  openDialog(type): void {
    this.saveType = type;
    let selectedArray = [];
    let selectionMultiplyInputs = [];
    let instructions = false;
    let largeModal = false;

    if (this.saveType == "equipment") {
      for (let item of this.equipmentList) {
        if (item.name)
          selectedArray.push(item.name)
      }
    } else if (this.saveType == "tools") {
      for (let item of this.toolsList) {
        if (item.toolname)
          selectedArray.push(item.toolname)
      }
    } else if (this.saveType == "instructions") {
      instructions = true;
    } else if (this.saveType == "activity") {
      for (let item of this.activityData) {
        if (item.activity)
          selectedArray.push(item.activity)
        largeModal = true;
      }
    } else if (this.saveType == "activity2") {
      for (let item of this.activityData2) {
        if (item.activity)
          selectedArray.push(item.activity)
        largeModal = true;
      }
    } else if (this.saveType == "operations") {
      for (let item of this.criticalOperationsData) {
        if (item.name)
          selectedArray.push(item.name)
      }
    }
    else if (this.saveType == "activityCrew") {
      console.log(this.ActivityCrew)
      selectionMultiplyInputs[0] = {
        placeholder: "Hard Hat Number",
        key: "hardhatnumber",
        data: []
      }
      selectionMultiplyInputs[1] = {
        placeholder: "Name",
        key: "name",
        data: []
      }
      selectionMultiplyInputs[2] = {
        placeholder: "Assignment",
        key: "assignment",
        data: []
      }
      for (let item of this.ActivityCrew) {
        if (item._id) {
          selectionMultiplyInputs[1].data.push(item.hardhatnumber);
          selectionMultiplyInputs[2].data.push(item.name);
          selectionMultiplyInputs[0].data.push(item.assignment);
        }
      }
    }

    else if (this.saveType == "activityCrew2") {
      console.log(this.ActivityCrew2)
      selectionMultiplyInputs[0] = {
        placeholder: "Hard Hat Number",
        key: "hardhatnumber",
        data: []
      }
      selectionMultiplyInputs[1] = {
        placeholder: "Name",
        key: "name",
        data: []
      }
      selectionMultiplyInputs[2] = {
        placeholder: "Assignment",
        key: "assignment",
        data: []
      }
      for (let item of this.ActivityCrew2) {
        if (item._id) {
          selectionMultiplyInputs[1].data.push(item.hardhatnumber);
          selectionMultiplyInputs[2].data.push(item.name);
          selectionMultiplyInputs[0].data.push(item.assignment);
        }
      }
    }

    let data;
    if (selectedArray.length) {
      data = { array: selectedArray }
    } else if (selectionMultiplyInputs.length) {
      data = { array: selectionMultiplyInputs, multiInputs: true }
    } else if (instructions === true) {
      data = { instructions: 'true' }
    }

    if (largeModal === true) {
      this.dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        width: '450px',
        data: data
      });
    } else {
      this.dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        width: '250px',
        data: data
      });
    }


    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });

    console.log(selectedArray)
  }

  getData() {
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

    this.summaryServ.getActivity().subscribe(data => {
      this.activityData = data;
      this.activityData2 = data;
    })

    this.summaryServ.getActivityCrew().subscribe(data => {
      this.ActivityCrew = data;
      this.ActivityCrew2 = data;
    })

    this.summaryServ.getCriticalOperations().subscribe(data => {
      this.criticalOperationsData = data;
      console.log(this.criticalOperationsData, 'criticalOperationsData')
    })

  }

  checkEquipmentAll(value) {
    let arrays = Object.keys(this.equipment);
    for (let i = 0; i <= arrays.length; i++) {
      this.equipmentChecked[i] = value;
    }
  }

  checkToolsAll(value) {
    let arrays = Object.keys(this.tools);
    for (let i = 0; i <= arrays.length; i++) {
      this.toolsChecked[i] = value;
    }
  }

  ToCheckedEquipment(value) {
    if (!value) {
      this.equipmentCheckedAll = false;
    }
  }

  ToCheckedTools(value) {
    if (!value) {
      this.toolsCheckedAll = false;
    }
  }

  removeEquipment() {
    let count = 0;
    let arrays = Object.keys(this.equipmentChecked);
    for (const key of arrays) {
      if (this.equipmentChecked[key]) {
        this.equipment.splice(+key - count, 1);
        count += 1;
      }
    }
    this.equipmentChecked = {};
  }

  removeLifeCritical() {
    let count = 0;
    let arrays = Object.keys(this.lifeCriticalChecked);
    for (const key of arrays) {
      if (this.lifeCriticalChecked[key]) {
        this.OperationsData.splice(+key - count, 1);
        count += 1;
      }
    }
    this.lifeCriticalChecked = {};
  }

  removeTools() {
    let count = 0;
    let arrays = Object.keys(this.toolsChecked);
    for (const key of arrays) {
      if (this.toolsChecked[key]) {
        this.tools.splice(+key - count, 1);
        count += 1;
      }
    }
    this.toolsChecked = {};
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  removeAsigment1() {
    console.log(this.selection, 'selected');
    for (let i = 0; i < ELEMENT_DATA.length; i++) {
      for (let j = 0; j < this.selection.selected.length; j++) {
        if (ELEMENT_DATA[i].assignment === this.selection.selected[j].assignment &&
          ELEMENT_DATA[i].hardhatnumber === this.selection.selected[j].hardhatnumber &&
          ELEMENT_DATA[i].name === this.selection.selected[j].name) {
          ELEMENT_DATA.splice(i, 1);
          this.selection.selected.slice(j, 1);
        }
      }
    }
    this.selection = new SelectionModel<PeriodicElement>(true, []);
    this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  }

  isAllSelected2() {
    const numSelected = this.selection2.selected.length;
    const numRows = this.dataSource2.data.length;
    return numSelected === numRows;
  }

  masterToggle2() {
    this.isAllSelected2() ?
      this.selection2.clear() :
      this.dataSource2.data.forEach(row => this.selection2.select(row));
  }

  removeAsigment2() {
    console.log(this.selection2, 'selected');
    for (let i = 0; i < ELEMENT_DATA2.length; i++) {
      for (let j = 0; j < this.selection2.selected.length; j++) {
        if (ELEMENT_DATA2[i].assignment === this.selection2.selected[j].assignment &&
          ELEMENT_DATA2[i].hardhatnumber === this.selection2.selected[j].hardhatnumber &&
          ELEMENT_DATA2[i].name === this.selection2.selected[j].name) {
          ELEMENT_DATA2.splice(i, 1);
          this.selection2.selected.slice(j, 1);
        }
      }
    }
    this.selection2 = new SelectionModel<PeriodicElement>(true, []);
    this.dataSource2 = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA2);
  }

  goToCrewPage() {
    this.router.navigate(['/crew']);
  }

  ActionsData = ['Actions 1', 'Actions 2', 'Actions 3']

  displayedColumns: string[] = ['select', 'hardhatnumber', 'name', 'assignment'];

  displayedColumns2: string[] = ['select', 'hardhatnumber', 'name', 'assignment'];

  displayedColumnsLogistic: string[] = ['contact', 'name', 'number', 'radio'];

  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  dataSource2 = new MatTableDataSource<PeriodicElement2>(ELEMENT_DATA2);

  selection = new SelectionModel<PeriodicElement>(true, []);

  selection2 = new SelectionModel<PeriodicElement2>(true, []);

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
    <p *ngIf="!instructions">Add element</p>
    <p *ngIf="instructions">
      Please include an "OK" at the bottom of the dialogue that will close the dialogue when pressed
    </p>

    <form class="example-form">
      <mat-form-field *ngIf="!multiInputs && !instructions" style="width: 100%;" class="example-full-width">
        <input [(ngModel)]="text" type="text" placeholder="" aria-label="Number" matInput 
        [formControl]="myControl" [matAutocomplete]="auto">
        <mat-autocomplete #auto="matAutocomplete">
        <mat-option *ngFor="let option of filteredOptions | async" [value]="option">
            {{option}}
          </mat-option>
        </mat-autocomplete>
      </mat-form-field>
      <div *ngIf="multiInputs">
        <mat-form-field  *ngFor="let item of dataMulti;let i = index" style="width: 100%;" class="example-full-width">
          <input [(ngModel)]="texts[item.key]" type="text" [placeholder]="item.placeholder" aria-label="Number" 
          matInput [formControl]="controls[i]" [matAutocomplete]="auto">
          <mat-autocomplete #auto="matAutocomplete">
          <mat-option *ngFor="let option of filderedOptionsArr[i] | async" [value]="option">
              {{option}}
            </mat-option>
          </mat-autocomplete>
          </mat-form-field>
      </div>

    </form>

  </div>
  <div mat-dialog-actions>
    <button *ngIf="!instructions" mat-button (click)="onNoClick()">No Thanks</button>
    <button mat-button (click)="save()">Ok</button>
  </div>`,
})

export class DialogOverviewExampleDialog implements OnInit {

  myControl = new FormControl();
  controls = [];
  options: string[] = this.data.array;
  dataMulti;
  multiInputs;
  filteredOptions: Observable<string[]>;
  filderedOptionsArr = []
  texts = {};
  instructions;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    private summaryServ: SummaryService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(this.data, 2323)
    this.dataMulti = this.data.array;

    if (this.data.array && this.data.array.length)
      for (let i = 0; i < this.data.array.length; i++) {
        this.controls.push(new FormControl());
        this.texts[this.data.array[i].key] = "";
        let filteredOptions = this.controls[i].valueChanges
          .pipe(
            startWith(''),
            map((value: any) => this._filter(value, this.data.array[i].data))
          );
        this.filderedOptionsArr.push(filteredOptions);
      }

    if (this.data.array && this.data.multiInputs)
      this.multiInputs = this.data.multiInputs;

    if (this.data.instructions)
      this.instructions = this.data.instructions
  }

  text = '';

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, this.options))
      );
    console.log(this.data)
  }

  private _filter(value: string, data): string[] {
    const filterValue = value.toString().toLowerCase();

    return data.filter(option => option.toString().toLowerCase().includes(filterValue));
  }

  save() {
    if (this.text)
      this.summaryServ.event.tools.emit(this.text);
    if (this.multiInputs)
      this.summaryServ.event.tools.emit(this.texts);

    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
