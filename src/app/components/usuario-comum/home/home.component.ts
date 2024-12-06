import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MensagemDTO } from '../../../shared/model/dto/MensagemDTO';
import { Mensagem } from '../../../shared/model/entity/Mensagem';
import { Usuario } from '../../../shared/model/entity/Usuario';
import { AuthorizationService } from '../../../shared/service/authorization/authorization.service';
import { MensagemService } from '../../../shared/service/mensagem/mensagem.service';
import { UsuarioService } from '../../../shared/service/usuario/usuario.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeUserCommomComponent implements OnInit{

  private authorizationService = inject(AuthorizationService);
  private usuarioService = inject(UsuarioService);
  private mensagemService = inject(MensagemService);
  private router = inject(Router);
  public usuario = new Usuario();
  public mensagem = new Mensagem();
  public mensagens: Mensagem[] = [];
  public MensagemDTO = new MensagemDTO();

  ngOnInit(): void {
    this.getUsuario();
  }

  public getUsuario(): void {
    const idUsuario: number = this.authorizationService.getIdUsuarioAutenticado();
    this.usuarioService.consultarPorId(idUsuario).subscribe((usuario: Usuario) => {
        this.usuario = usuario;
      });
  }

  public buscarTodasMensagens(): void {
    this.mensagemService.buscarTodos().subscribe((resultado) => {
      this.mensagens = resultado;
    });
  }

  public curtirMensagem(idMensagem: string): void {
    this.mensagemService.curtirMensagem(idMensagem).subscribe((resultado) => {
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

}
