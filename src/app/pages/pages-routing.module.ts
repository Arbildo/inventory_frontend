import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import {ProductComponent} from './product/product/product.component';
import {ProductDetailInputComponent} from './product/product-detail-input/product-detail-input.component';
import {UserComponent} from './user/user/user.component';
import {ClientsComponent} from './clients/clients/clients.component';
import {LotComponent} from './product/lot/lot.component';
import {LosingListComponent} from './losing/losing-list/losing-list.component';
import {LosingCreateComponent} from './losing/losing-create/losing-create.component';
import {InventoryPrecisionComponent} from './reports/inventory-precision/inventory-precision.component';
import {InventoryRotationComponent} from './reports/inventory-rotation/inventory-rotation.component';
import {AuthGuardService} from '../auth/auth-guard.service';
import {ProfileComponent} from './profile/profile/profile.component';
import {ProductDetailOutputComponent} from './product/product-detail-output/product-detail-output/product-detail-output.component';
import {ProductDetailOutputListComponent} from "./product/product-detail-output/product-detail-output-list/product-detail-output-list.component";

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'profile',
      canActivate: [AuthGuardService],
      component: ProfileComponent,
    },
    {
      path: 'products',
      canActivate: [AuthGuardService],
      component: ProductComponent,
    },
    {
      path: 'products/lots',
      canActivate: [AuthGuardService],
      component:  LotComponent,
    },
    {
      path: 'products/input',
      canActivate: [AuthGuardService],
      component:  ProductDetailInputComponent,
    },
    {
      path: 'products/output',
      canActivate: [AuthGuardService],
      component:  ProductDetailOutputComponent,
    },
    {
      path: 'products/output/list',
      canActivate: [AuthGuardService],
      component:  ProductDetailOutputListComponent,
    },
    {
      path: 'users',
      canActivate: [AuthGuardService],
      component: UserComponent,
    },
    {
      path: 'clients',
      canActivate: [AuthGuardService],
      component: ClientsComponent,
    },
    {
      path: 'losing',
      canActivate: [AuthGuardService],
      component: LosingListComponent,
    },
    {
      path: 'losing/create',
      canActivate: [AuthGuardService],
      component: LosingCreateComponent,
    },
    {
      path: 'reports/inventory-precision',
      canActivate: [AuthGuardService],
      component: InventoryPrecisionComponent,
    },
    {
      path: 'reports/inventory-rotation',
      canActivate: [AuthGuardService],
      component: InventoryRotationComponent,
    },
    // {
    //   path: 'iot-dashboard',
    //   component: DashboardComponent,
    // },
    // {
    //   path: 'layout',
    //   loadChildren: () => import('./layout/layout.module')
    //     .then(m => m.LayoutModule),
    // },
    // {
    //   path: 'forms',
    //   loadChildren: () => import('./forms/forms.module')
    //     .then(m => m.FormsModule),
    // },
    // {
    //   path: 'ui-features',
    //   loadChildren: () => import('./ui-features/ui-features.module')
    //     .then(m => m.UiFeaturesModule),
    // },
    // {
    //   path: 'modal-overlays',
    //   loadChildren: () => import('./modal-overlays/modal-overlays.module')
    //     .then(m => m.ModalOverlaysModule),
    // },
    // {
    //   path: 'extra-components',
    //   loadChildren: () => import('./extra-components/extra-components.module')
    //     .then(m => m.ExtraComponentsModule),
    // },
    // {
    //   path: 'maps',
    //   loadChildren: () => import('./maps/maps.module')
    //     .then(m => m.MapsModule),
    // },
    // {
    //   path: 'charts',
    //   loadChildren: () => import('./charts/charts.module')
    //     .then(m => m.ChartsModule),
    // },
    // {
    //   path: 'editors',
    //   loadChildren: () => import('./editors/editors.module')
    //     .then(m => m.EditorsModule),
    // },
    // {
    //   path: 'tables',
    //   loadChildren: () => import('./tables/tables.module')
    //     .then(m => m.TablesModule),
    // },
    // {
    //   path: 'miscellaneous',
    //   loadChildren: () => import('./miscellaneous/miscellaneous.module')
    //     .then(m => m.MiscellaneousModule),
    // },
    {
      path: '',
      redirectTo: 'profile',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
