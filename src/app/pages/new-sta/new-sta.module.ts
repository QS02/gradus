import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SharedModule } from '../../shared/shared.module';
import { MatDialogModule} from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NewStaComponent, DialogOverviewExampleDialog } from './new-sta/new-sta.component';
import { HttpClientModule } from '@angular/common/http';

export const routes = [
  { path: '', component: NewStaComponent, pathMatch: 'full' },
  { path: 'dialog', component: DialogOverviewExampleDialog, data: { breadcrumb: 'Dialog' } },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgxChartsModule,
    PerfectScrollbarModule,
    SharedModule,
    MatDialogModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [
    NewStaComponent,
    DialogOverviewExampleDialog,
    DialogOverviewExampleDialog,
  ]
})

export class NewStaModule { }
