import { Component, inject, OnInit } from '@angular/core';
import { Usuario } from '../../../shared/model/entity/Usuario';
import { AuthorizationService } from '../../../shared/service/authorization/authorization.service';
import { DenunciaService } from '../../../shared/service/denuncia/denuncia.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Denuncia } from '../../../shared/model/entity/Denuncia';
import { DenunciaSeletor } from '../../../shared/model/seletor/denunciaSeletor';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MotivoDenuncia } from '../../../shared/model/enums/MotivoDenuncia';
import { SituacaoDenuncia } from '../../../shared/model/enums/SituacaoDenuncia';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeUserAdminComponent implements OnInit {

  public denuncia: Denuncia = new Denuncia();
  public denuncias: Denuncia[] = [];
  public idDenuncia: number;
  public motivoDenunciaEnum = Object.keys(MotivoDenuncia);
  public situacaoDenunciaEnum = Object.keys(SituacaoDenuncia);

  public seletor: DenunciaSeletor = new DenunciaSeletor();

  public totalPaginas: number;
  public totalRegistros: number;
  public offset: number;
  public readonly TAMANHO_PAGINA: number = 3;

  constructor(
    private denunciaService: DenunciaService,
    private router: Router,
    private httpClient: HttpClient,
  ){ }

  private authorizationService = inject(AuthorizationService);

  private usuario = new Usuario();

  ngOnInit(): void {
    this.consultarTodasDenuncias();
    this.seletor.limite = this.TAMANHO_PAGINA;
    this.seletor.pagina = 1;
    this.pesquisar();
    this.contarPaginas();
  }


  public consultarTodasDenuncias() {
    this.denunciaService.buscarTodas().subscribe(
      (resultado) => {
        console.log("result: " ,resultado);
        this.denuncias = resultado;
        console.log("result this.denuncia: " ,this.denuncia);
      },
      (erro) => {
        console.error('Erro ao consultar todas as denuncias', erro);
      }
    );
  }

  public pesquisar() {
    this.denunciaService.consultarComSeletor(this.seletor).subscribe(
      (resultado) => {
        this.denuncias = resultado;
        this.contarRegistros();
      },
      (erro) => {
        console.error('Erro ao buscar denuncias', erro.error?.mensagem || erro);
      }
    );
  }

  public limpar() {
    this.seletor = new DenunciaSeletor();
    this.seletor.limite = this.TAMANHO_PAGINA;
    this.seletor.pagina = 1;
  }

  // arrumar dps
  public analisar(): void{
    this.router.navigate(['/home']);
  }

  contarRegistros(){
    this.denunciaService.contarRegistros(this.seletor).subscribe(
      (count: number) => {
        this.totalRegistros = count
      },
      erro => {
        console.log('Erro ao contar registros de denuncia', erro.error.mensagem)
      }
    )
  }

  atualizarPaginacao() {
    this.contarPaginas();
    this.pesquisar();
  }

  proximaPg(){
    this.seletor.pagina++;
    this.pesquisar();
  }

  voltarPg(){
    this.seletor.pagina--;
    this.pesquisar();
  }

  irParaPagina(indicePagina: number) {
    this.seletor.pagina = indicePagina;
    this.pesquisar();
  }

   // Método para criar um array de páginas para ser utilizado no ngFor do HTML
   criarArrayPaginas(): any[] {
    return Array(this.totalPaginas).fill(0).map((x, i) => i + 1);
  }


  contarPaginas(){
    this.denunciaService.contarPaginas(this.seletor).subscribe(
      (count: number) => {
        this.totalPaginas = count
      },
      erro => {
        console.log('Erro ao contar paginas de denuncia', erro.error.mensagem)
      }
    )
  }
}
