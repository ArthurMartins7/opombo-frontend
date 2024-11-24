import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor() {}

  public getPerfilAcessoDoUsuarioAutenticado(): any {
    const token = localStorage.getItem('tokenUsuarioAutenticado');

    if (token) {
      const tokenDecodificado: any = jwtDecode(token);
      return tokenDecodificado.roles;
    }
    return null;
  }
}
