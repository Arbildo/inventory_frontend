import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryRotationComponent } from './inventory-rotation/inventory-rotation.component';
import { InventoryPrecisionComponent } from './inventory-precision/inventory-precision.component';
import {NbCardModule} from '@nebular/theme';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    InventoryRotationComponent,
    InventoryPrecisionComponent,
  ],
  imports: [
    CommonModule,
    NbCardModule,
    ReactiveFormsModule,
  ],
})
export class ReportsModule { }
