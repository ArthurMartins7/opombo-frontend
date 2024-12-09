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
import { SituacaoDenuncia } from '../../shared/model/enums/SituacaoDenuncia';

@Component({
  selector: 'app-gerenciar-denuncia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gerenciar-denuncia.component.html',
  styleUrls: ['./gerenciar-denuncia.component.scss'],
})
export class GerenciarDenunciaComponent {
  private authorizationService = inject(AuthorizationService);
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);
  private denunciaService = inject(DenunciaService);
  private mensagemService = inject(MensagemService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  public usuario = new Usuario();
  public denuncia = new Denuncia();
  public idDenuncia: string;
  public mensagemDenunciada = new Mensagem();


  public mensagem = new Mensagem();

  ngOnInit(): void {
    this.getUsuario();

    this.route.params.subscribe((params) => {
      console.log('Parâmetros da rota:', params);
      this.denuncia.id = params['idDenuncia'];
      if (this.denuncia.id) {
        this.buscarDenuncia();
      } else {
        console.error('ID da denúncia não encontrado na URL');
      }
    });
  }

  public voltar(){
    this.router.navigate(['/home-user-admin']);
  }

  public rejeitarDenuncia(): void {
    this.denunciaService.rejeitarDenuncia(this.denuncia.id).subscribe(
      () => {
        Swal.fire('Sucesso', 'Denúncia rejeitada!', 'success').then(() => {
          this.buscarDenuncia(); // Atualiza os dados na tela
        });
        this.voltar();
      },
      (erro) => {
        Swal.fire('Erro ao rejeitar denúncia', erro.error, 'error');
      }
    );
  }

  public aceitarDenuncia(): void {
    this.denunciaService.aceitarDenuncia(this.denuncia.id).subscribe(
      () => {

        // Chama o método para bloquear a mensagem, atualizando a situação para BLOQUEADA
        this.mensagemService.bloquearMensagem(this.denuncia.mensagem.id).subscribe(
          () => {
            // Atualiza a situação para BLOQUEADA após bloquear a mensagem
            //this.denuncia.situacao = SituacaoDenuncia.BLOQUEADA;

            // Exibe uma mensagem de sucesso
            Swal.fire('Sucesso', 'Denúncia aceita e bloqueada!', 'success').then(() => {
              this.buscarDenuncia(); // Atualiza os dados na tela
            });
          },
          (erro) => {
            // Trata o erro e exibe uma mensagem apropriada
            Swal.fire('Erro ao bloquear a mensagem', erro.error, 'error');
          }
        );
      },
      (erro) => {
        Swal.fire('Erro ao aceitar denúncia', erro.error, 'error');
      }
    );
  }



  public bloquearMensagem(): void {
    this.mensagemService.bloquearMensagem(this.denuncia.mensagem.id).subscribe({
      next: () => {
        // Atualiza o status da denúncia para BLOQUEADA diretamente
        //this.denuncia.situacao = SituacaoDenuncia.BLOQUEADA;

        // Exibe uma mensagem de sucesso e, se necessário, realiza ações subsequentes
        Swal.fire('Sucesso', 'Denúncia bloqueada!', 'success');
      },
      error: (erro) => {
        // Trata o erro e exibe uma mensagem apropriada

        Swal.fire('Erro ao bloquear a mensagem!', erro.error, 'error');
      }
    });
  }


  public getUsuario(): void {
    const idUsuario: number =
      this.authorizationService.getIdUsuarioAutenticado();
    this.usuarioService
      .consultarPorId(idUsuario)
      .subscribe((usuario: Usuario) => {
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
