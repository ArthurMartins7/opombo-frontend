import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../model/entity/Usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor() { }

  private httpClient = inject(HttpClient);

  private readonly API = 'http://localhost:8080/opombo/api/usuario';

  public listarTodos(): Observable <Array<Usuario>> {
    return this.httpClient.get<Array<Usuario>>(this.API);
  }

  public consultarPorId(id: number): Observable <Usuario> {
    return this.httpClient.get<Usuario>(this.API + '/' + id);
  }
}
