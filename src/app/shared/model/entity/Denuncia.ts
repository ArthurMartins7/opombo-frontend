import { MotivoDenuncia } from "../enums/MotivoDenuncia";
import { SituacaoDenuncia } from "../enums/SituacaoDenuncia";
import { Mensagem } from "./Mensagem";
import { Usuario } from "./Usuario";

export class Denuncia {

  id: number;
  motivo: MotivoDenuncia;
  situacao: SituacaoDenuncia = SituacaoDenuncia.PENDENTE;
  dataHoraCriacao: string;
  denunciante: Usuario;
  mensagem: Mensagem;
}
