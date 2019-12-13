export interface Client {
  idCliente: number;
  codigo: string;
  nombre: string;
  numeroDoc: string;
  direccion: string;
  correo: string;
  telefono: string;
  estado: number;
  idTipo: ClientType;
}

interface ClientType {
  idTipo: number;
  tipo: string;
  estado: number;
}
