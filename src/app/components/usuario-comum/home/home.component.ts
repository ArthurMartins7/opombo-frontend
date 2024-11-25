import { Component, inject, OnInit } from '@angular/core';
import { Usuario } from '../../../shared/model/entity/Usuario';
import { AuthorizationService } from '../../../shared/service/authorization/authorization.service';
import { UsuarioService } from '../../../shared/service/usuario/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeUserCommomComponent implements OnInit{

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
