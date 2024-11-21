import { Denuncia } from "./Denuncia";
import { Usuario } from "./Usuario";

export class Mensagem {
  id: string;
  texto: string;
  dataHoraCriacao: string;
  denuncias: Denuncia[];
  usuario: Usuario;
  curtidas: Usuario[];
  quantidadeLikes: number = 0;
  bloqueado: boolean = false;
  imagemEmBase64: string;

}
