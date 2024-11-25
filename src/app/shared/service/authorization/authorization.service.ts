import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor() {}

  public getIdUsuarioAutenticado(): any {
    const token = localStorage.getItem('tokenUsuarioAutenticado');

    if (token) {
      const tokenDecodificado: any = jwtDecode(token);
      return tokenDecodificado.idUsuario;
    }
    return null;
  }
}
