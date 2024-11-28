import { BaseSeletor } from "../enums/baseSeletor";

export class MensagemSeletor extends BaseSeletor{

  dataInicialCriacao: Date;
  dataFinalCriacao: Date;
  nomeUsuario: string;
  texto: string;
  bloqueado: boolean;

}
