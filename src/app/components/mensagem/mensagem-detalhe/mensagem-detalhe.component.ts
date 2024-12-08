import { Router } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { AuthorizationService } from '../../../shared/service/authorization/authorization.service';
import { UsuarioService } from '../../../shared/service/usuario/usuario.service';
import { MensagemService } from '../../../shared/service/mensagem/mensagem.service';
import { Usuario } from '../../../shared/model/entity/Usuario';
import { Mensagem } from '../../../shared/model/entity/Mensagem';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mensagem-detalhe',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './mensagem-detalhe.component.html',
  styleUrl: './mensagem-detalhe.component.scss'
})
export class MensagemDetalheComponent implements OnInit {

  private authorizationService = inject(AuthorizationService);
  private usuarioService = inject(UsuarioService);
  private mensagemService = inject(MensagemService);
  private router = inject(Router);

  public usuario = new Usuario();
  public mensagem = new Mensagem();

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

  inserir(): void {
    const m: Mensagem = {
      id: '',
      texto: this.mensagem.texto, // Texto vindo do form
      dataHoraCriacao: '', // Pode ser preenchido pelo backend
      denuncias: [], // Pode ser vazio se não for usado
      usuario: { id: this.usuario.id } as Usuario, // Apenas o ID do usuário
      curtidas: [], // Lista vazia inicial
      quantidadeLikes: 0,
      bloqueado: false,
      imagemEmBase64: this.mensagem.imagemEmBase64 || '', // Caso tenha imagem
    };

    console.log('id do usuário:', this.usuario.id);
    console.log('mensagem a ser enviada:', m);

    this.mensagemService.publicarMensagem(m).subscribe(
      (resposta) => {
        console.log('resposta: ', resposta)
        Swal.fire('Pruu salvo com sucesso!', '', 'success');
        if (this.selectedFile){
          this.uploadImagem(resposta.id);
        }else{
          this.voltar();
        }
        this.voltar();
      },
      (erro) => {
        Swal.fire('Erro ao salvar o pruu: ' + erro.error, 'error');
        console.log('A merda do erro: ' , erro);
      }
    );
  }

  uploadImagem(idMensagem: string): void {
    const formData = new FormData();
    formData.append('imagem', this.selectedFile!, this.selectedFile!.name);

    this.mensagemService.uploadImagem(idMensagem, formData).subscribe({
      next: () => {
        Swal.fire('Imagem carregada com sucesso!', '', 'success');
        this.voltar();
      },
      error: (erro) => {
        Swal.fire('Erro ao fazer upload da imagem: ' + erro.error, 'error');
      }
    });
  }

  public voltar(): void {
    this.router.navigate(['/home-user-commom'])

  }

  public salvar(): void {
    this.mensagem.usuario = this.usuario;
    this.mensagemService.publicarMensagem(this.mensagem).subscribe((result) => {
      Swal.fire('Sucesso', 'Pruu criado com sucesso', 'success');
    },

    (erro) => {
      Swal.fire('Erro', erro.mensagem, 'error');

    }

  );

  }

  public getUsuario(): Usuario {
    const u = new Usuario();
    const idUsuario: number = this.authorizationService.getIdUsuarioAutenticado();
    this.usuarioService.consultarPorId(idUsuario).subscribe((usuario: Usuario) => {
        this.usuario = usuario;
      });

      return u;
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
