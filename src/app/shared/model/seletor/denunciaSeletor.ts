import { MotivoDenuncia } from '../enums/MotivoDenuncia';
import { SituacaoDenuncia } from '../enums/SituacaoDenuncia';
import { BaseSeletor } from '../enums/baseSeletor';

export class DenunciaSeletor extends BaseSeletor {
  constructor() {
    super();
    this.limite = 3; // Valor padrão
    this.pagina = 1;
  }

  motivo: MotivoDenuncia;
  situacao: SituacaoDenuncia;
  dataInicialCriacao: string;
  dataFinalCriacao: string;
}
