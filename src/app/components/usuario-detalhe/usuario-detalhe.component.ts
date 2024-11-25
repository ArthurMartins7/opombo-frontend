import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { UsuarioService } from '../../shared/service/usuario/usuario.service';
import { AuthorizationService } from '../../shared/service/authorization/authorization.service';
import { Usuario } from '../../shared/model/entity/Usuario';
import { UsuarioEditadoDTO } from '../../shared/model/dto/UsuarioEditadoDTO';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuario-detalhe',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './usuario-detalhe.component.html',
  styleUrl: './usuario-detalhe.component.scss'
})
export class UsuarioDetalheComponent {
  private router = inject(Router)
  private usuarioService = inject(UsuarioService)
  private authorizationService = inject(AuthorizationService)

  public usuario = new Usuario();
  public usuarioEditadoDTO = new UsuarioEditadoDTO();

  public voltar() {
    this.verificarPerfilAcesso();
  }

  public verificarPerfilAcesso() {
    const idUsuario: number =
      this.authorizationService.getIdUsuarioAutenticado();

    this.usuarioService.consultarPorId(idUsuario).subscribe((usuario: Usuario) => {
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

  public salvar(): void {

  }

}
