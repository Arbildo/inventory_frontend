import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import {MostSoldComponent} from './most-selled/most-sold.component';
import {DebtorsComponent} from './debtors/debtors.component';
import {SoonOutOfStockComponent} from './soon-out-of-stock/soon-out-of-stock.component';
import {UtilitiesComponent} from './utilities/utilities.component';

@NgModule({
  declarations: [
    MainComponent,
    MostSoldComponent,
    DebtorsComponent,
    SoonOutOfStockComponent,
    UtilitiesComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class MainModule { }
