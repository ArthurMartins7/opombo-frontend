import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioDTO } from '../../shared/model/dto/UsuarioDTO';
import { AuthenticationService } from '../../shared/service/authentication/authentication.service';
import { AuthorizationService } from '../../shared/service/authorization/authorization.service';
import { Usuario } from '../../shared/model/entity/Usuario';
import { UsuarioService } from '../../shared/service/usuario/usuario.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public usuarioDTO = new UsuarioDTO();
  public usuario = new Usuario();

  private usuarioService = inject(UsuarioService);

  constructor(
    private authenticationService: AuthenticationService,
    private authorizationService: AuthorizationService,
    private router: Router
  ) {}

  public realizarLogin() {
    console.log('usuarioDTO: ', this.usuarioDTO);
    localStorage.removeItem('tokenUsuarioAutenticado');
    this.authenticationService.autenticar(this.usuarioDTO).subscribe({
      next: (jwt) => {
        Swal.fire('Sucesso', 'Usuário autenticado com sucesso', 'success');
        let token: string = jwt.body + '';
        localStorage.setItem('tokenUsuarioAutenticado', token);
        this.verificarPerfilAcesso();
      },
      error: (erro) => {
        var mensagem: string;
        if (erro.status == 401) {
          mensagem = 'Usuário ou senha inválidos, tente novamente';
        } else {
          mensagem = erro.error;
        }

        Swal.fire('Erro', mensagem, 'error');
      },
    });
  }

  public realizarCadastro() {
    this.router.navigate(['/cadastro']);
  }

  public verificarPerfilAcesso() {
    const idUsuario: number =
      this.authorizationService.getIdUsuarioAutenticado();

    this.usuarioService.consultarPorId(idUsuario).subscribe((usuario: Usuario) => {
        this.usuario = usuario;
        console.log('usuarioAutenticado conferir: ', this.usuario);

        if (this.usuario.perfilAcesso == 'ADMIN') {
          console.log('usuarioAutenticado admin: ', this.usuario);
          this.router.navigate(['/home-user-admin']);
        } else {
          console.log('usuarioAutenticado comum: ', this.usuario);
          this.router.navigate(['/home-user-commom']);
        }
        console.log('usuarioAutenticado: ', this.usuario);
        console.log('perfil de acesso: ',  this.usuario.perfilAcesso);
      });
  }
}
