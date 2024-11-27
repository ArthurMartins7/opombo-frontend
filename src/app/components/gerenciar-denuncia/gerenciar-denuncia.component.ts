import { Component, inject } from '@angular/core';
import { AuthorizationService } from '../../shared/service/authorization/authorization.service';
import { UsuarioService } from '../../shared/service/usuario/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../shared/model/entity/Usuario';
import { Denuncia } from '../../shared/model/entity/Denuncia';
import { Mensagem } from '../../shared/model/entity/Mensagem';
import { CommonModule } from '@angular/common';
import { DenunciaService } from '../../shared/service/denuncia/denuncia.service';
import { MensagemService } from '../../shared/service/mensagem/mensagem.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gerenciar-denuncia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gerenciar-denuncia.component.html',
  styleUrls: ['./gerenciar-denuncia.component.scss']
})
export class GerenciarDenunciaComponent {
  private authorizationService = inject(AuthorizationService);
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);
  public usuario = new Usuario();
  public denuncia = new Denuncia();
  public idDenuncia: string;
  public mensagemDenunciada: Mensagem;
  private denunciaService = inject(DenunciaService);
  private mensagemService = inject(MensagemService);
  private route: ActivatedRoute = inject(ActivatedRoute);  // Injeção corrigida

  ngOnInit(): void {
    this.getUsuario();

    this.route.params.subscribe(params => {
      console.log('Parâmetros da rota:', params);
      this.denuncia.id = params['id'];
      if (this.denuncia.id) {
        this.buscarDenuncia();
      } else {
        console.error('ID da denúncia não encontrado na URL');
      }
    });


  }

  public getUsuario(): void {
    const idUsuario: number = this.authorizationService.getIdUsuarioAutenticado();
    this.usuarioService.consultarPorId(idUsuario).subscribe((usuario: Usuario) => {
      this.usuario = usuario;
    });
  }

  public redirectToProfileDetails(): void {
    this.router.navigate(['/usuario-detalhe']);
  }

  public logOut(): void {
    alert('Entrou no logout');
    localStorage.removeItem('tokenUsuarioAutenticado');
    this.router.navigate(['']);
  }

  private buscarMensagemDenunciada(idMensagem: string): void {
    this.mensagemService.consultarPorId(idMensagem).subscribe(
      (mensagem) => {
        this.mensagemDenunciada = mensagem;
      },
      (erro) => {
        console.error('Erro ao buscar mensagem denunciada:', erro);
      }
    );
  }

  buscarDenuncia(): void {
    if (this.denuncia.id) {
      this.denunciaService.consultarPorId(this.denuncia.id).subscribe(
        (denuncia) => {
          this.denuncia = denuncia;
          if (denuncia.mensagem && denuncia.mensagem.id) {
            this.buscarMensagemDenunciada(denuncia.mensagem.id);
          }
        },
        (erro) => {
          Swal.fire('Erro ao buscar a denúncia!', erro, 'error');
        }
      );

    }
  }


}
