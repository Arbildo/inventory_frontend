import {ProductType} from './product-type';
import {Unity} from './Unity';

export interface Product {

  idProducto: number;
  nombre: string;
  codigo: string;
  descripcion: string;
  imagen: string;
  estado: ProductoEstado;
  idTipo: ProductType;
  idUnidad: Unity;
}

export interface ProductoEstado {
    idEstado: number;
    estado: string;
}
