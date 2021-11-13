import {Component} from '@angular/core';



@Component({
  selector: 'ngx-utilities',
  templateUrl: './utilities.component.html',
  styleUrls: ['./utilities.component.scss'],
})
export class UtilitiesComponent {

  title = 'Reporte de utilidades';
  selectOptions = [
    {
      value: 'daily',
      label: 'Diario',
    },
    {
      value: 'weekly',
      label: 'Semanal',
    },
    {
      value: 'weekly',
      label: 'Mensual',
    },
  ];
  tabledHeader = [
    'N°',
    'Producto',
    'Stock',
  ];
  tableValues = [
    [
      {order: '1'},
      {product: 'Manzanas'},
      {stock: '100 unidades'},
    ],
    [
      {order: '2'},
      {product: 'Manzanas'},
      {stock: '100 unidades'},
    ],
    [
      {order: '3'},
      {product: 'Manzanas'},
      {stock: '100 unidades'},
    ],
    [
      {order: '4'},
      {product: 'Manzanas'},
      {stock: '100 unidades'},
    ],
    [
      {order: '5'},
      {product: 'Manzanas'},
      {stock: '100 unidades'},
    ],
  ];
  constructor() {
  }

  returnValue(object) {
    return Object.values(object);
  }
}
