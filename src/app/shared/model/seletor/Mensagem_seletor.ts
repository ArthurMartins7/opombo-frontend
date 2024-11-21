import { BaseSeletor } from "./base_seletor";

export class MensagemSeletor extends BaseSeletor{

  dataInicialCriacao: Date;
  dataFinalCriacao: Date;
  nomeUsuario: string;
  texto: string;
  bloqueado: boolean;

}
