import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../model/entity/Usuario';
import { Observable } from 'rxjs';
import { UsuarioEditadoDTO } from '../../model/dto/UsuarioEditadoDTO';

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

  public atualizar(id: number, usuarioEditadoDTO: UsuarioEditadoDTO): Observable<Usuario> {
    return this.httpClient.put<Usuario>(this.API + '/' + id, usuarioEditadoDTO);
  }

  uploadImagem(idusuario: number, formData: FormData): Observable<any> {
    return this.httpClient.post(`${this.API}/${idusuario}/upload`, formData);
  }
}
