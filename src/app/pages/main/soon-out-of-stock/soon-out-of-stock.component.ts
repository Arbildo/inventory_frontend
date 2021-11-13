import {Component} from '@angular/core';



@Component({
  selector: 'ngx-soon-out-of-stock',
  templateUrl: './soon-out-of-stock.component.html',
  styleUrls: ['./soon-out-of-stock.component.scss'],
})
export class SoonOutOfStockComponent {

  title = 'Pronto a agotarse';
  selectOptions = [
    {
      value: 'week',
      label: 'Semana',
    },
    {
      value: 'month',
      label: 'Mes',
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
      {product: 'Gaseosa'},
      {stock: '10 unidades'},
    ],
    [
      {order: '2'},
      {product: 'Doritos'},
      {stock: '50 unidades'},
    ],
    [
      {order: '3'},
      {product: 'Doritos'},
      {stock: '50 unidades'},
    ],
    [
      {order: '4'},
      {product: 'Doritos'},
      {stock: '50 unidades'},
    ],
    [
      {order: '5'},
      {product: 'Doritos'},
      {stock: '50 unidades'},
    ],
  ];
  constructor() {
  }

  returnValue(object) {
    return Object.values(object);
  }
}
