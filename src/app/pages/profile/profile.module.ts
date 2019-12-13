import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import {NbCardModule} from "@nebular/theme";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    NbCardModule,
    ReactiveFormsModule,
  ],
})
export class ProfileModule { }
