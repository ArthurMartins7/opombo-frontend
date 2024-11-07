import { Router } from '@angular/router';
import { LoginService } from '../shared/service/login.service';
import { UsuarioDTO } from './../shared/model/dto/UsuarioDTO';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
//import { UsuarioDTO } from '../shared/model/dto/UsuarioDTO';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public usuarioDTO = new UsuarioDTO();

  constructor(private loginService: LoginService, private router: Router) {}

  public realizarLogin() {
    this.loginService.autenticar(this.usuarioDTO).subscribe({
      next: (jwt) => {
        Swal.fire('Sucesso', 'Usuário autenticado com sucesso', 'success');
        let token: string = jwt.body + '';
        localStorage.setItem('tokenUsuarioAutenticado', token);
        this.router.navigate(['/home']);
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

  public cadastrar() {}
}
