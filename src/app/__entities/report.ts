import {Lote} from './Lote';

export interface ReportExactitud {
  lote: Lote;
  details: [{
    idProductoDetalle: number,
    stockInicial: number,
    producto: string,
    losing: {
    codigo: string,
    fecha: string,
    descripcion: string,
    cantidad: number,
  }
  total: number,
  exactitud: string,
  }
  ];
}

export interface ReportRotacion {
  lote: Lote;
  details: [{
    idProductoDetalle: number,
    stockInicial: number,
    producto: string,
    detalles: {
      idDetallePedido: number,
      cantidad: number,
      precio: string,
    }
    total: number,
    rotacion: string,
  }
  ];
}
