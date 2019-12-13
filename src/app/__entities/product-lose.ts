import {ProductDetail} from './ProductDetail';

export interface ProductLose {
  idPerdida: number;
  codigo: string;
  fecha: string;
  cantidad: number;
  descripcion: string;
  estado: State;
  idDetalleProducto: ProductDetail;
}

interface State {
  id: number;
  nombre: string;
}
