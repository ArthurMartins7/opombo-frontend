import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../../shared/model/entity/Usuario';
import { AuthenticationService } from '../../shared/service/authentication/authentication.service';
import { UsuarioService } from '../../shared/service/usuario/usuario.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {

  private usuarioService = inject(UsuarioService);

  public usuario = new Usuario();

  public selectedFile: File | null = null;
  public imagePreview: string | ArrayBuffer | null = null;


  constructor(private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public cadastrar() {
    console.log('usuario: ', this.usuario);
    this.authenticationService.cadastrarUsuario(this.usuario).subscribe(
      (resultado) => {
        Swal.fire({
          title: "Cadastro realizado com sucesso!",
          text: "",
          icon: "success",
          showConfirmButton: true,
          confirmButtonColor: "#bef264"
        })
        this.voltar();
      },
      (erro) => {
        Swal.fire({
          title: "Erro ao realizar cadastro",
          text: erro.error,
          icon: "error",
          showConfirmButton: true,
          confirmButtonColor: "#bef264"
        })
      }
    )
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
    //this.usuario.imagemEmBase64 || '', // Caso tenha imagem

    console.log('id do usuário:', this.usuario.id);

    this.authenticationService.cadastrarUsuario(this.usuario).subscribe(
      (resposta) => {
        console.log('resposta aaa: ', resposta);
        Swal.fire({
          title: "Cadastro realizado com sucesso!",
          text: "",
          icon: "success",
          showConfirmButton: true,
          confirmButtonColor: "#bef264"
        })
        if (this.selectedFile) {
          console.log('reposta img: ',resposta);
          this.uploadImagem(resposta.id);
        } else {
          this.voltar();
        }
        this.voltar();
      },
      (erro) => {
        Swal.fire({
          title: "Erro ao realizar cadastro",
          text: erro.error,
          icon: "error",
          showConfirmButton: true,
          confirmButtonColor: "#bef264"
        })
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


public voltar() {
  this.router.navigate([''])
}

}
