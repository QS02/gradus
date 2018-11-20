import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaSummaryComponent } from './sta-summary/sta-summary.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SharedModule } from '../../shared/shared.module';

export const routes = [
  { path: '', component: StaSummaryComponent, pathMatch: 'full' }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgxChartsModule,
    PerfectScrollbarModule,
    SharedModule
  ],
  declarations: [StaSummaryComponent]
})
export class StaSummaryModule { }
