export type Tipo = 'hora' | 'lugar';
export type Direccion = 'recibido' | 'encargado';

export interface Memo {
  titulo: string;
  persona: string;
  direccion: Direccion;
  tipo: Tipo;
  hora?: string;
  lugar?: string;
  hecho: boolean;
}

export const MEMOS: Memo[] = [
  { titulo: 'Comprar pan para el desayuno', persona: 'Karina Guerrero', direccion: 'recibido', tipo: 'hora', hora: '9:00 AM', hecho: true },
  { titulo: 'Busca los papeles del banco', persona: 'Luz Marina', direccion: 'recibido', tipo: 'hora', hora: '12:00 PM', hecho: false },
  { titulo: 'Saca una tarjeta nueva', persona: 'Luz Marina', direccion: 'recibido', tipo: 'lugar', lugar: 'Banco BBVA', hecho: true },
  { titulo: 'Llama a la EPS para cita', persona: 'Luz Marina', direccion: 'recibido', tipo: 'hora', hora: '7:00 AM', hecho: false },
  { titulo: 'Recoge la fórmula de Mamá', persona: 'Karina Guerrero', direccion: 'recibido', tipo: 'lugar', lugar: 'Droguería La Rebaja', hecho: false },
  { titulo: 'Pagar el recibo del agua', persona: 'Gustavo Rodriguez', direccion: 'encargado', tipo: 'hora', hora: '6:00 PM', hecho: false },
  { titulo: 'Sacar al perro', persona: 'Karina Guerrero', direccion: 'encargado', tipo: 'hora', hora: '8:00 PM', hecho: true },
];

export interface Recuadro {
  id: string;
  titulo: string;
  direccion: Direccion;
  tipo?: Tipo;
}

export const RECUADROS_GRANDES: Recuadro[] = [
  { id: 'recibidos', titulo: 'Memos Recibidos', direccion: 'recibido' },
  { id: 'encargados', titulo: 'Memos Encargados', direccion: 'encargado' },
];

export const RECUADROS_PEQUENOS: Recuadro[] = [
  { id: 'recibidos-hora', titulo: 'Recibidos por Hora', direccion: 'recibido', tipo: 'hora' },
  { id: 'recibidos-lugar', titulo: 'Recibidos por Lugar', direccion: 'recibido', tipo: 'lugar' },
  { id: 'encargados-hora', titulo: 'Encargados por Hora', direccion: 'encargado', tipo: 'hora' },
  { id: 'encargados-lugar', titulo: 'Encargados por Lugar', direccion: 'encargado', tipo: 'lugar' },
];

export function memosDe(recuadro: Recuadro): Memo[] {
  return MEMOS.filter(
    (m) => m.direccion === recuadro.direccion && (!recuadro.tipo || m.tipo === recuadro.tipo),
  );
}

export interface Lugar {
  id: number;
  nombre: string;
  direccion: string;
  lat: number;
  lng: number;
  radio: number;
}

export const LUGARES: Lugar[] = [
  { id: 1, nombre: 'Droguería La Rebaja', direccion: 'Cll XX # XYZ - ZZ', lat: 10.9878, lng: -74.7889, radio: 50 },
  { id: 2, nombre: 'Gasolinera Terpel', direccion: 'Cll XX # XYZ - ZZ', lat: 10.9965, lng: -74.8081, radio: 75 },
  { id: 3, nombre: 'Veterinaria Mis Huellitas', direccion: 'Cll XX # XYZ - ZZ', lat: 11.0041, lng: -74.8132, radio: 40 },
  { id: 4, nombre: 'Olímpica 58', direccion: 'Cll XX # XYZ - ZZ', lat: 10.9921, lng: -74.7967, radio: 60 },
];

export const PERIODOS = ['Últimos 7 días', 'Últimos 30 días', 'Últimos 3 meses'];
export const CONTACTOS = ['Karina Guerrero', 'Luz Marina', 'Gustavo Rodriguez'];

export interface MemoCerrado {
  titulo: string;
  detalle: string;
  fecha: string;
  semana: 'Esta semana' | 'Semana pasada' | 'Hace dos semanas';
  direccion: Direccion;
  cumplido: boolean;
}

export const MEMOS_CERRADOS: MemoCerrado[] = [
  { titulo: 'Los medicamentos de mamá', detalle: 'Lo hizo {contacto} - Droguería La Rebaja', fecha: 'Sep 12', semana: 'Esta semana', direccion: 'encargado', cumplido: true },
  { titulo: 'Pasa por las frutas', detalle: 'Lo hiciste tú - Frutería Villa C.', fecha: 'Sep 11', semana: 'Esta semana', direccion: 'recibido', cumplido: true },
  { titulo: 'Busca los papeles del banco', detalle: '{contacto} no pudo hacerlo - 12:00 PM', fecha: 'Sep 10', semana: 'Esta semana', direccion: 'encargado', cumplido: false },
  { titulo: 'Comprar pan para el desayuno', detalle: 'Lo hiciste tú - 9:00 AM', fecha: 'Sep 6', semana: 'Semana pasada', direccion: 'recibido', cumplido: true },
  { titulo: 'Llama a la EPS para cita', detalle: 'Lo hiciste tú - 9:00 AM', fecha: 'Sep 4', semana: 'Semana pasada', direccion: 'recibido', cumplido: true },
  { titulo: 'Recoge el paquete de Servientrega', detalle: 'Lo hizo {contacto} - Servientrega Cll 72', fecha: 'Sep 3', semana: 'Semana pasada', direccion: 'encargado', cumplido: true },
  { titulo: 'Pagar la factura de la luz', detalle: 'Lo hiciste tú - 6:00 PM', fecha: 'Ago 29', semana: 'Hace dos semanas', direccion: 'recibido', cumplido: true },
  { titulo: 'Compra el regalo de cumpleaños', detalle: 'Lo hizo {contacto} - Centro Comercial Buenavista', fecha: 'Ago 27', semana: 'Hace dos semanas', direccion: 'encargado', cumplido: true },
];

export const SEMANAS = [
  { etiqueta: '18-24 ago', tu: 5, contacto: 3 },
  { etiqueta: '25-31 ago', tu: 4, contacto: 2 },
  { etiqueta: '1-7 sep', tu: 6, contacto: 3 },
  { etiqueta: '8-13 sep', tu: 3, contacto: 3 },
];
