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

  // public pesquisar() {
  //   this.denunciaService.buscarTodas(this.seletor).subscribe(
  //     (resultado) => {
  //       this.corredores = resultado;
  //       //this.contarRegistros()
  //     },
  //     (erro) => {
  //       console.error('Erro ao buscar corredores', erro.error.mensagem);
  //     }
  //   );
  //   this.contarPaginas()
  // }

  public limpar() {
    this.seletor = new DenunciaSeletor();
    this.seletor.limite = this.TAMANHO_PAGINA;
    this.seletor.pagina = 1;
  }
}
