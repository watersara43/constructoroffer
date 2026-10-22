export type Perfil = "closer" | "emprendedor";

export interface SolucionProblem {
  problema: string;
  solucion: string;
}

export interface FormData {
  perfil: Perfil;
  producto: string;
  transformacion: string;
  cliente: string;
  dolorPrincipal: string;
  problemas: string[];
  soluciones: SolucionProblem[];
}

export interface Termometro {
  pregunta: string;
  respuestaCaliente: string;
  respuestaFria: string;
}

export interface Pilar {
  nombre: string;
  problemasConectados: string[];
  solucion: string;
  beneficio: string;
  guionLlamada: string;
  termometro: Termometro;
}

export interface GeneratedResult {
  pilares: Pilar[];
  chuletaLlamada: string;
}

export type Step =
  | "bienvenida"
  | "perfil"
  | "producto"
  | "cliente"
  | "problemas"
  | "soluciones"
  | "generando"
  | "resultado";
