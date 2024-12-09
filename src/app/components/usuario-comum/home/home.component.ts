import { Component, inject, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MensagemDTO } from '../../../shared/model/dto/MensagemDTO';
import { Mensagem } from '../../../shared/model/entity/Mensagem';
import { Usuario } from '../../../shared/model/entity/Usuario';
import { AuthorizationService } from '../../../shared/service/authorization/authorization.service';
import { MensagemService } from '../../../shared/service/mensagem/mensagem.service';
import { UsuarioService } from '../../../shared/service/usuario/usuario.service';
import { DenunciaService } from '../../../shared/service/denuncia/denuncia.service';
import { MotivoDenuncia } from '../../../shared/model/enums/MotivoDenuncia';
import { Denuncia } from '../../../shared/model/entity/Denuncia';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MensagemSeletor } from '../../../shared/model/seletor/mensagemSeletor';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeUserCommomComponent implements OnInit {
  private authorizationService = inject(AuthorizationService);
  private usuarioService = inject(UsuarioService);
  private mensagemService = inject(MensagemService);
  private denunciaService = inject(DenunciaService);
  private router = inject(Router);

  public usuario = new Usuario();
  public mensagem = new Mensagem();
  public mensagens: Mensagem[] = [];
  public MensagemDTO = new MensagemDTO();
  public mensagemSeletor: MensagemSeletor = new MensagemSeletor();

  menuAberto: string | null = null;
  motivoDenunciaEnum = Object.values(MotivoDenuncia);
  motivoSelecionado: MotivoDenuncia | null = null;
  showDenunciaModal = false;
  mensagemParaDenunciar: string | null = null;
  public mostrarFiltros = false;

  ngOnInit(): void {
    this.getUsuario();
    //this.buscarTodasMensagens();
    this.buscarTodasMensagensAtivas();
  }

  public getUsuario(): void {
    const idUsuario: number =
      this.authorizationService.getIdUsuarioAutenticado();
    this.usuarioService
      .consultarPorId(idUsuario)
      .subscribe((usuario: Usuario) => {
        this.usuario = usuario;
        console.log('Usuario carregado:', usuario);
      });
  }

  public buscarTodasMensagens(): void {
    this.mensagemService.buscarTodos().subscribe((resultado) => {
      console.log('resultado: ', resultado);
      this.mensagens = resultado;
    });
  }

  public buscarTodasMensagensAtivas(): void {
    this.mensagemService.buscarTodasMensagensAtivas().subscribe((resultado) => {
      console.log('resultado: ', resultado);
      this.mensagens = resultado;
    });
  }

  public curtirMensagem(idMensagem: string): void {
    this.mensagemService.curtirMensagem(idMensagem).subscribe(
      (resultado) => {
        this.buscarTodasMensagens();
      },
      (erro) => {
        Swal.fire('Erro ao curtir mensagem: ' + erro.error, 'error');
      }
    );
  }

  public criarPruu(): void {
    this.router.navigate(['/mensagem-detalhe']);
  }

  public redirectToProfileDetails(): void {
    this.router.navigate(['/usuario-detalhe']);
  }

  public logOut(): void {
    alert('entrou no logout');
    localStorage.removeItem('tokenUsuarioAutenticado');
    this.router.navigate(['']);
  }

  public usuarioCurtiuMensagem(mensagem: Mensagem): boolean {
    if (!mensagem.curtidas || !this.usuario) return false;
    return mensagem.curtidas.some((c) => c.id === this.usuario.id);
  }

  toggleMenu(mensagemId: string) {
    this.menuAberto = this.menuAberto === mensagemId ? null : mensagemId;
  }

  denunciarMensagem(mensagemId: string) {
    this.mensagemParaDenunciar = mensagemId;
    this.showDenunciaModal = true;
    this.menuAberto = null;
  }

  fecharModalDenuncia() {
    this.showDenunciaModal = false;
    this.mensagemParaDenunciar = null;
    this.motivoSelecionado = null;
  }

  enviarDenuncia() {
    if (!this.motivoSelecionado || !this.mensagemParaDenunciar) return;

    const denuncia = new Denuncia();
    denuncia.motivo = this.motivoSelecionado;
    denuncia.mensagem = { id: this.mensagemParaDenunciar } as Mensagem;
    denuncia.denunciante = { id: this.usuario.id } as Usuario;

    this.denunciaService.denunciar(denuncia).subscribe({
      next: () => {
        Swal.fire('Sucesso', 'Denúncia enviada com sucesso!', 'success');
        this.fecharModalDenuncia();
      },
      error: (erro) => {
        console.log(erro);
        Swal.fire('Erro', 'Erro ao enviar denúncia: ' + erro.error, 'error');
      },
    });
  }

  excluirMensagem(idMensagem: string) {
    // Exibe o Swal de confirmação primeiro
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá reverter esta ação!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar Pruu!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.mensagemService.marcarMensagemComoExcluida(idMensagem).subscribe(
          (res) => {
            Swal.fire({
              title: 'Deletado!',
              text: 'Pruu deletado com sucesso.',
              icon: 'success',
            });
            this.buscarTodasMensagensAtivas();
          },
          (erro) => {
            Swal.fire('Erro ao excluir a mensagem!', erro.error, 'error');
          }
        );
      }
    });

    // Fecha o menu após a ação, independentemente da resposta
    this.menuAberto = null;
  }

  public pesquisar() {
    this.mensagemService.consultarComSeletor(this.mensagemSeletor).subscribe(
      (resultado) => {
        console.log('resultado', resultado);
        this.mensagens = resultado;
        //this.contarRegistros();
      },
      (erro) => {
        console.error(
          'Erro ao buscar mensagens com filtro',
          erro.error?.mensagem || erro
        );
      }
    );
  }

  public limpar() {
    this.mensagemSeletor = new MensagemSeletor();
  }

  public toggleFiltros(): void {
    this.mostrarFiltros = !this.mostrarFiltros;
  }

  @HostListener('document:click', ['$event'])
  clickFora(event: Event) {
    if (!(event.target as HTMLElement).closest('.relative')) {
      this.menuAberto = null;
    }
  }
}
