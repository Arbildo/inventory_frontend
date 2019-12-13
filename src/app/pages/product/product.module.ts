import { NgModule } from '@angular/core';
import {ProductComponent} from './product/product.component';
import {SmartTableComponent} from './product/smart-table/smart-table.component';
import {NbButtonModule, NbCardModule, NbDialogModule, NbInputModule, NbSelectModule} from '@nebular/theme';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import { ProductDetailInputComponent } from './product-detail-input/product-detail-input.component';
import { ModalComponent } from './product/smart-table/modal/modal.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TableComponent} from './product-detail-input/table/table.component';
import { FormProductDetailComponent } from './product-detail-input/form-product-detail/form-product-detail.component';
import { LotComponent } from './lot/lot.component';
import { LotTableComponent } from './lot/lot-table/lot-table.component';
import { ModalInputComponent } from './lot/modal-input/modal-input.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { EditProductModalComponent } from './product/smart-table/edit-product-modal/edit-product-modal.component';
import { EditLotComponent } from './lot/edit-lot/edit-lot.component';
import { EditInputModalComponent } from './product-detail-input/edit-input-modal/edit-input-modal.component';
import {ProductDetailOutputComponent} from './product-detail-output/product-detail-output/product-detail-output.component';
import {ProductDetailOutputListComponent} from './product-detail-output/product-detail-output-list/product-detail-output-list.component';
import { OutputListDetailModalComponent } from './product-detail-output/product-detail-output-list/output-list-detail-modal/output-list-detail-modal.component';

@NgModule({
  declarations: [
    ProductComponent,
    SmartTableComponent,
    ProductDetailInputComponent,
    ModalComponent,
    TableComponent,
    FormProductDetailComponent,
    LotComponent,
    LotTableComponent,
    ProductDetailOutputComponent,
    ModalInputComponent,
    EditProductModalComponent,
    EditLotComponent,
    EditInputModalComponent,
    ProductDetailOutputListComponent,
    OutputListDetailModalComponent,
  ],
  schemas: [
    SmartTableComponent,
    TableComponent,
  ],
  imports: [
    CommonModule,
    NbCardModule,
    Ng2SmartTableModule,
    NbInputModule,
    NbButtonModule,
    NbDialogModule.forChild(),
    NbSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  entryComponents: [
    ModalComponent,
    FormProductDetailComponent,
    ModalInputComponent,
    EditProductModalComponent,
    EditLotComponent,
    EditInputModalComponent,
    OutputListDetailModalComponent,
  ],
})
export class ProductModule { }
