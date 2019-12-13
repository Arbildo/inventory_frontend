export interface Lote {
  idLote: number;
  nombre: string;
  fechaVencimiento: string;
  fechaCreacion: string;
  estado: State;
}

export interface State {
  id: number;
  nombre: string;
}
