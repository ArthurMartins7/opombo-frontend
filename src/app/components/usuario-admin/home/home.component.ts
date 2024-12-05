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
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeUserAdminComponent implements OnInit {

  private denunciaService = inject(DenunciaService);
  private router = inject(Router);
  private httpClient = inject(HttpClient);
  private authorizationService = inject(AuthorizationService);


  private usuario = new Usuario();

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

  ngOnInit(): void {
    //this.consultarTodasDenuncias();
    //this.seletor.limite = this.TAMANHO_PAGINA;
    //this.seletor.pagina = 1;

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
        console.log('resultado', resultado)
        this.denuncias = resultado;
        //this.contarRegistros();
      },
      (erro) => {
        console.error('Erro ao buscar denuncias', erro.error?.mensagem || erro);
      }
    );
  }

  buscarPorId(): void {
    this.denunciaService.consultarPorId(this.idDenuncia).subscribe(
      (denuncia) => {
        this.denuncia = denuncia;
      },
      (erro) => {
        Swal.fire('Erro ao buscar a carta!', erro.mensagem, 'error');
      }
    );
  }

  public limpar() {
    this.seletor = new DenunciaSeletor();
    this.seletor.limite = this.TAMANHO_PAGINA;
    this.seletor.pagina = 1;
  }


  public analisar(idDenuncia: number): void{
    this.router.navigate(['/gerenciar-denuncia/', idDenuncia]);
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
