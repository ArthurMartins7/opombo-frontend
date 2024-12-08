import { PerfilAcesso } from "../enums/PerfilAcesso";
import { Mensagem } from "./Mensagem";

export class Usuario {
  id: number;
  perfilAcesso: PerfilAcesso
  cpf: string;
  nome: string;
  email: string;
  senha: string;
  criadoEm: string;
  dataUltimaModificacao: string;
  mensagens: Mensagem[];
  imagemEmBase64: string;
}
