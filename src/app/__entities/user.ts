import {Cargo} from './cargo';

export interface User {
  idUsuario: number;
  codigo: string;
  nombres: string;
  apellidos: string;
  usuario: string;
  correo: string;
  foto: string;
  estado: Estado;
  cargo: Cargo;
}

export interface Estado {
  idEstado: number;
  estado: string;
}
