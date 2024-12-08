import { Router } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { UsuarioService } from '../../shared/service/usuario/usuario.service';
import { AuthorizationService } from '../../shared/service/authorization/authorization.service';
import { Usuario } from '../../shared/model/entity/Usuario';
import { UsuarioEditadoDTO } from '../../shared/model/dto/UsuarioEditadoDTO';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-detalhe',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './usuario-detalhe.component.html',
  styleUrl: './usuario-detalhe.component.scss',
})
export class UsuarioDetalheComponent implements OnInit {
  private router = inject(Router);
  private usuarioService = inject(UsuarioService);
  private authorizationService = inject(AuthorizationService);

  public usuario = new Usuario();
  public usuarioEditadoDTO = new UsuarioEditadoDTO();

  public selectedFile: File | null = null;
  public imagePreview: string | ArrayBuffer | null = null;

  ngOnInit(): void {
    this.getUsuario();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file && file.size <= 10 * 1024 * 1024) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    } else {
      alert('Tamanho de arquivo não permitido! Máximo: 10MB.');
      this.selectedFile = null;
      this.imagePreview = null;
    }
  }

  salvar(): void {
    const u: UsuarioEditadoDTO = {
      perfilAcesso: this.usuario.perfilAcesso,
      nome: this.usuario.nome,
      email: this.usuario.email,
      senha: this.usuario.senha,
      cpf: this.usuario.cpf,
      imagemEmBase64: this.usuario.imagemEmBase64 || '', // Caso tenha imagem
    };

    console.log('id do usuário:', this.usuario.id);

    this.usuarioService.atualizar(this.usuario.id, u).subscribe(
      (resposta) => {
        console.log('resposta: ', resposta);
        Swal.fire('Perfil editado com sucesso!', '', 'success');
        if (this.selectedFile) {
          this.uploadImagem(resposta.id);
        } else {
          this.voltar();
        }
        this.voltar();
      },
      (erro) => {
        Swal.fire('Erro ao editar perfil: ' + erro.error, 'error');
        console.log('A merda do erro: ', erro);
      }
    );
  }

  uploadImagem(idUsuario: number): void {
    const formData = new FormData();
    formData.append('imagem', this.selectedFile!, this.selectedFile!.name);

    this.usuarioService.uploadImagem(idUsuario, formData).subscribe({
      next: () => {
        Swal.fire('Imagem carregada com sucesso!', '', 'success');
        this.voltar();
      },
      error: (erro) => {
        Swal.fire('Erro ao fazer upload da imagem: ' + erro.error, 'error');
      },
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

  public voltar() {
    this.verificarPerfilAcesso();
  }

  public verificarPerfilAcesso() {
    const idUsuario: number =
      this.authorizationService.getIdUsuarioAutenticado();

    this.usuarioService
      .consultarPorId(idUsuario)
      .subscribe((usuario: Usuario) => {
        this.usuario = usuario;
        console.log('usuarioAutenticado conferir: ', this.usuario);

        if (this.usuario.perfilAcesso == 'ADMIN') {
          this.router.navigate(['/home-user-admin']);
        } else {
          this.router.navigate(['/home-user-commom']);
        }
        console.log('usuarioAutenticado: ', this.usuario);
      });
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
