import {Component} from '@angular/core';



@Component({
  selector: 'ngx-debtors',
  templateUrl: './debtors.component.html',
  styleUrls: ['./debtors.component.scss'],
})
export class DebtorsComponent {

  title = 'Deudores';
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
    'Nombre',
    'Monto',
  ];
  tableValues = [
    [
      {order: '1'},
      {product: 'Yubitza Rojas'},
      {stock: '10000.00'},
    ],
    [
      {order: '2'},
      {product: 'Pedro'},
      {stock: '896.00'},
    ],
    [
      {order: '3'},
      {product: 'Pedro'},
      {stock: '896.00'},
    ],
     [
      {order: '4'},
      {product: 'Pedro'},
      {stock: '896.00'},
    ],
     [
      {order: '5'},
      {product: 'Pedro'},
      {stock: '896.00'},
    ],
  ];
  constructor() {
  }

  returnValue(object) {
    return Object.values(object);
  }
}
