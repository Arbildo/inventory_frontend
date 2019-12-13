import {Client} from './client';
import {User} from './user';
import {ProductDetail} from "./ProductDetail";

export interface Pedido {
  idPedido: number;
  fechaPedido: string;
  estado: number;
  idCliente: Client;
  idEncargado: User;
  total: number;
}
export interface DetallePedido {
  idDetallePedido: number;
  cantidad: number;
  precio: number;
  estado: number;
  idPedido: Pedido;
  idProductoDetalle: ProductDetail;
}
