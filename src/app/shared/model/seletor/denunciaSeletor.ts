import { MotivoDenuncia } from '../enums/MotivoDenuncia';
import { SituacaoDenuncia } from '../enums/SituacaoDenuncia';
import { BaseSeletor } from './baseSeletor';

export class DenunciaSeletor extends BaseSeletor{

  motivo: MotivoDenuncia;
  situacao: SituacaoDenuncia;
  dataInicialCriacao: string;
  dataFinalCriacao: string;
}
