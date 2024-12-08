import { PerfilAcesso } from "../enums/PerfilAcesso";

export class UsuarioEditadoDTO {

  perfilAcesso: PerfilAcesso;
  nome: string;
  email: string;
  senha: string;
  cpf: string;
  imagemEmBase64: string;

}
