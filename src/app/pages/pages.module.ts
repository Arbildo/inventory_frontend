import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import {ProductModule} from './product/product.module';
import {UserModule} from './user/user.module';
import {ClientsModule} from './clients/clients.module';
import {LosingModule} from './losing/losing.module';
import {ReportsModule} from './reports/reports.module';
import {MainModule} from './main/main.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    MainModule,
    ProductModule,
    UserModule,
    ClientsModule,
    LosingModule,
    ReportsModule,
    MiscellaneousModule,
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
