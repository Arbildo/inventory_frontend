import { NgModule } from '@angular/core';
import { LosingListComponent } from './losing-list/losing-list.component';
import { LosingCreateComponent } from './losing-create/losing-create.component';
import {NbCardModule} from '@nebular/theme';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { LosingModalComponent } from './losing-list/losing-modal/losing-modal.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    LosingListComponent,
    LosingCreateComponent,
    LosingModalComponent,
  ],
  entryComponents: [
    LosingModalComponent,
  ],
  imports: [
    NbCardModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule,
  ],
})
export class LosingModule { }
