import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioDTO } from '../../shared/model/dto/UsuarioDTO';
import { AuthenticationService } from '../../shared/service/authentication/authentication.service';
import { AuthorizationService } from '../../shared/service/authorization/authorization.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public usuarioDTO = new UsuarioDTO();

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
    const perfilAcesso: string =
      this.authorizationService.getPerfilAcessoDoUsuarioAutenticado();
    if (perfilAcesso == 'ADMIN') {
      this.router.navigate(['/home-user-admin']);
    } else {
      this.router.navigate(['/home-user-commom']);
    }
    console.log('perfil de acesso: ' + perfilAcesso);
  }
}
