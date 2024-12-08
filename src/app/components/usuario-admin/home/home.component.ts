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
import { UsuarioService } from '../../../shared/service/usuario/usuario.service';

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
  private usuarioService = inject(UsuarioService);


  public usuario = new Usuario();

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
    this.seletor = new DenunciaSeletor();
    this.seletor.limite = 3;
    this.seletor.pagina = 1;
    //this.buscarTodasDenuncias();
    this.getUsuario();
  }

  public getUsuario(): void {
    const idUsuario: number = this.authorizationService.getIdUsuarioAutenticado();
    this.usuarioService.consultarPorId(idUsuario).subscribe((usuario: Usuario) => {
        this.usuario = usuario;
        console.log('Usuario carregado:', usuario);
      });
  }

  public buscarTodasDenuncias(): void {
    this.denunciaService.buscarTodas().subscribe((resultado) => {
      console.log('resultado: ', resultado);
      this.denuncias = resultado;
    });
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
    console.log('Pesquisando com seletor:', this.seletor);
    this.denunciaService.consultarComSeletor(this.seletor).subscribe(
      (resultado) => {
        this.denuncias = resultado;
        this.contarPaginas();
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
    this.pesquisar();
  }


  public analisar(idDenuncia: number): void{
    this.router.navigate(['/gerenciar-denuncia/', idDenuncia]);
  }

  public redirectToProfileDetails(): void {
    this.router.navigate(['/usuario-detalhe']);
  }

  public logOut(): void {
    alert('entrou no logout');
    localStorage.removeItem('tokenUsuarioAutenticado');
    this.router.navigate(['']);
  }

  public atualizarPaginacao() {
    this.seletor.pagina = 1;
    this.pesquisar();
  }

  proximaPg() {
    if (this.seletor.pagina < this.totalPaginas) {
      this.seletor.pagina++;
      this.pesquisar();
    }
  }

  voltarPg() {
    if (this.seletor.pagina > 1) {
      this.seletor.pagina--;
      this.pesquisar();
    }
  }

  irParaPagina(indicePagina: number) {
    if (indicePagina >= 1 && indicePagina <= this.totalPaginas) {
      this.seletor.pagina = indicePagina;
      this.pesquisar();
    }
  }

  criarArrayPaginas(): number[] {
    return Array(this.totalPaginas).fill(0).map((_, i) => i + 1);
  }

  contarPaginas() {
    if (!this.seletor.limite) {
      this.seletor.limite = 3;
    }

    this.denunciaService.contarPaginas(this.seletor).subscribe(
      (count: number) => {
        this.totalPaginas = count;
        console.log('Total de páginas:', this.totalPaginas);
        console.log('Limite atual:', this.seletor.limite);
      },
      erro => {
        console.error('Erro ao contar paginas de denuncia', erro.error?.mensagem || erro);
        this.totalPaginas = 1;
      }
    );
  }
}
