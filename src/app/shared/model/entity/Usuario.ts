import { PerfilAcesso } from "../enums/PerfilAcesso";

export class Usuario {
  id: number;
  perfilAcesso: PerfilAcesso
  cpf: string;
  nome: string;
  email: string;
  senha: string;
  imagePerfil: string;
}
