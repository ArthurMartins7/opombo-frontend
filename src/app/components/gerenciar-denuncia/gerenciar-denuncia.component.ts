import { Component, inject } from '@angular/core';
import { AuthorizationService } from '../../shared/service/authorization/authorization.service';
import { UsuarioService } from '../../shared/service/usuario/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from '../../shared/model/entity/Usuario';

@Component({
  selector: 'app-gerenciar-denuncia',
  standalone: true,
  imports: [],
  templateUrl: './gerenciar-denuncia.component.html',
  styleUrl: './gerenciar-denuncia.component.scss'
})
export class GerenciarDenunciaComponent {

  private authorizationService = inject(AuthorizationService);
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);
  public usuario = new Usuario();

  ngOnInit(): void {
    this.getUsuario();
  }

  public getUsuario(): void {
    const idUsuario: number = this.authorizationService.getIdUsuarioAutenticado();
    this.usuarioService.consultarPorId(idUsuario).subscribe((usuario: Usuario) => {
        this.usuario = usuario;
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
