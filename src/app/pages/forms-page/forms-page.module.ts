import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SharedModule } from '../../shared/shared.module';
import { FormsPageComponent } from './forms-page/forms-page.component';
import { StaSummaryComponent, DialogOverviewExampleDialog } from './sta-summary/sta-summary.component';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

export const routes = [
  { path: '', redirectTo: 'sta-summary', pathMatch: 'full'},
  { path: 'sta-summary', component: StaSummaryComponent, data: { breadcrumb: 'STA Summary' } },
  { path: 'dialog', component: DialogOverviewExampleDialog, data: { breadcrumb: 'Dialog' } },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    HttpClientModule,
    NgxChartsModule,
    PerfectScrollbarModule,
    SharedModule,
    MatDialogModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    FormsPageComponent,
    StaSummaryComponent,
    DialogOverviewExampleDialog,
  ]
})
export class FormsPageModule { }