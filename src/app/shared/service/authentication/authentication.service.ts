import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioDTO } from '../../model/dto/UsuarioDTO';
import { Usuario } from '../../model/entity/Usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly API = 'http://localhost:8080/opombo/auth';

  constructor(private httpClient: HttpClient) {}

  autenticar(dto: UsuarioDTO): Observable<HttpResponse<string>> {
    const authHeader = 'Basic ' + btoa(`${dto.email}:${dto.senha}`);
    const headers = new HttpHeaders({
      Authorization: authHeader,
    });

    return this.httpClient.post<string>(this.API + '/authenticate', dto, {
      headers,
      observe: 'response',
      responseType: 'text' as 'json',
    });
  }

  public cadastrarUsuario(usuario: Usuario): Observable<any> {
    return this.httpClient.post<Usuario>(this.API + '/novo-usuario', usuario);
  }

  sair() {
    localStorage.removeItem('tokenUsuarioAutenticado');
  }
}
