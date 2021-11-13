import {Component} from '@angular/core';



@Component({
  selector: 'ngx-most-sold-products',
  templateUrl: './most-sold.component.html',
  styleUrls: ['./most-sold.component.scss'],
})
export class MostSoldComponent {

  title = 'Más vendidos';
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
