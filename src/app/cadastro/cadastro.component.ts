import { Component } from '@angular/core';
import { Usuario } from '../shared/model/entity/Usuario';
import { AuthenticationService } from '../shared/service/authentication.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    this.authenticationService.cadastrarUsuario(this.usuario).subscribe(
      resultado => {
        Swal.fire({
          title: "Cadastro realizado com sucesso!",
          text: "",
          icon: "success",
          showConfirmButton: true,
          confirmButtonColor: "#bef264"
        })
        this.voltar();
      },
      erro => {
        Swal.fire({
          title: "Erro ao realizar cadastro",
          html: erro.error.mensagem,
          icon: "error",
          showConfirmButton: true,
          confirmButtonColor: "#bef264"
        })
      }
    )
  }


public voltar() {
  this.router.navigate(['/login'])
}

}
