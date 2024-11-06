import { Router } from '@angular/router';
import { LoginService } from '../shared/service/login.service';
import { UsuarioDTO } from './../shared/model/dto/UsuarioDTO';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
//import { UsuarioDTO } from '../shared/model/dto/UsuarioDTO';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  public usuarioDTO = new UsuarioDTO();

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  public realizarLogin() {
    this.loginService.autenticar(this.usuarioDTO).subscribe(
      (token: any) => {
        Swal.fire('Sucesso', 'Usuário autenticado com sucesso', 'success');
        this.router.navigate(['/home']);
      },
      (erro) => {
        var mensagem: string;
        if (erro.status == 401) {
          mensagem = 'Usuário ou senha inválidos, tente novamente';
        } else {
          mensagem = erro.error.mensagem;
        }

        Swal.fire('Erro', mensagem, 'error');
        // Swal.fire('Erro', erro.error.mensagem, 'error');
      }
    );
  }
}
