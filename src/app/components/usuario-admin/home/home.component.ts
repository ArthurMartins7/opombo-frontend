import { Component, inject, OnInit } from '@angular/core';
import { Usuario } from '../../../shared/model/entity/Usuario';
import { AuthorizationService } from '../../../shared/service/authorization/authorization.service';
import { DenunciaService } from '../../../shared/service/denuncia/denuncia.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Denuncia } from '../../../shared/model/entity/Denuncia';
import { DenunciaSeletor } from '../../../shared/model/seletor/denunciaSeletor';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeUserAdminComponent implements OnInit {

  public denuncia: Denuncia = new Denuncia();
  public denuncias: Denuncia[] = [];
  public idDenuncia: number;

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

  ngOnInit(): void {}

  public consultarTodosCorredores() {
    this.denunciaService.buscarTodas().subscribe(
      (resultado) => {
        this.denuncias = resultado;
      },
      (erro) => {
        console.error('Erro ao consultar todas as denuncias', erro.error.mensagem);
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

}
