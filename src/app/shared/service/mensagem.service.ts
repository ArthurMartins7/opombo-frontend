import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mensagem } from '../model/entity/Mensagem';
import { MensagemSeletor } from '../model/seletor/Mensagem_seletor';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  private readonly API = 'http://localhost:8080/opombo/api/mensagens';

  constructor(private httpCliente: HttpClient) { }

  public buscarTodos(): Observable<Array<Mensagem>>{
    return this.httpCliente.get<Array<Mensagem>>(this.API);
  }

  public buscarComSeletor(seletor: MensagemSeletor): Observable<Array<Mensagem>>{
    return this.httpCliente.post<Array<Mensagem>>(this.API + '/filtro', seletor);

  }

  contarPaginas(seletor: MensagemSeletor): Observable<number> {
    return this.httpCliente.post<number>(this.API + '/total-paginas', seletor);
  }

  public publicarMensagem(mensagem: Mensagem):
  Observable<any>{
    return this.httpCliente.post<any>(this.API, mensagem);
  }

  public alterarMensagem(mensagem: Mensagem):
  Observable<any>{
    return this.httpCliente.put<any>(this.API + "/alterar", mensagem);
  }

  public excluirMensagemPorId(idMensagem: string):
  Observable<any>{
    return this.httpCliente.put<any>(this.API + "/id/", idMensagem);
  }

  public bloquearMensagem(idMensagem: string):
  Observable<any>{
    return this.httpCliente.put<any>(this.API + "/idMensagem/", idMensagem);
  }
}
