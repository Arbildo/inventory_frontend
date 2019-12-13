import {Lote} from './Lote';
import {Product} from './product';

export interface ProductDetail {
  idProductoDetalle: number;
  stockInicial: number;
  stockMinimo: number;
  stockActual: number;
  precio: number;
  estado: State;
  idProducto: Product;
  idLote: Lote;
}

export interface State {
  id: number;
  nombre: string;
}
