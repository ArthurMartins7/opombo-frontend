import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../../shared/service/authentication/authentication.service';
import { Usuario } from '../../shared/model/entity/Usuario';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {

  public usuario = new Usuario();

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


public voltar() {
  this.router.navigate([''])
}

}
