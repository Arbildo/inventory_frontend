import { NgModule } from '@angular/core';
import {SmartTableComponent} from './clients/smart-table/smart-table.component';
import {NbCardModule} from '@nebular/theme';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {ClientsComponent} from './clients/clients.component';

@NgModule({
  declarations: [
    ClientsComponent,
    SmartTableComponent,
  ],
  imports: [
    NbCardModule,
    Ng2SmartTableModule,
  ],
})
export class ClientsModule { }
