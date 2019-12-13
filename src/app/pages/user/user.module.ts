import { NgModule } from '@angular/core';
import {UserComponent} from './user/user.component';
import {SmartTableComponent} from './user/smart-table/smart-table.component';
import {NbButtonModule, NbCardModule} from '@nebular/theme';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import { EditUserComponent } from './user/smart-table/edit-user/edit-user.component';
import { CreateUserComponent } from './user/smart-table/create-user/create-user.component';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    UserComponent,
    SmartTableComponent,
    EditUserComponent,
    CreateUserComponent,
  ],

  imports: [
    NbCardModule,
    Ng2SmartTableModule,
    CommonModule,
    ReactiveFormsModule,
    NbButtonModule,
  ],
  entryComponents: [
    EditUserComponent,
    CreateUserComponent,
  ],
})
export class UserModule { }
