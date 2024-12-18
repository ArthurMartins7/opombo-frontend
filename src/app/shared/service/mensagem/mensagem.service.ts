import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensagemSeletor } from '../../model/seletor/mensagemSeletor';
import { Mensagem } from '../../model/entity/Mensagem';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  private readonly API = 'http://localhost:8080/opombo/api/mensagens';

  constructor(private httpCliente: HttpClient) { }

  uploadImagem(idMensagem: string, formData: FormData): Observable<any> {
    return this.httpCliente.post(`${this.API}/${idMensagem}/upload`, formData);
  }

  public consultarComSeletor(seletor: MensagemSeletor): Observable<Array<Mensagem>> {
    return this.httpCliente.post<Array<Mensagem>>(this.API + '/filtro', seletor);
  }

  public buscarTodos(): Observable<Array<Mensagem>>{
    return this.httpCliente.get<Array<Mensagem>>(this.API);
  }

  public buscarComSeletor(seletor: MensagemSeletor): Observable<Array<Mensagem>>{
    return this.httpCliente.post<Array<Mensagem>>(this.API + '/filtro', seletor);

  }

  contarPaginas(seletor: MensagemSeletor): Observable<number> {
    return this.httpCliente.post<number>(this.API + '/total-paginas', seletor);
  }

  public publicarMensagem(mensagem: Mensagem):Observable<any>{
    return this.httpCliente.post<any>(this.API, mensagem);
  }

  public alterarMensagem(mensagem: Mensagem):
  Observable<any>{
    return this.httpCliente.put<any>(this.API + '/alterar', mensagem);
  }

  public consultarPorId(id: string): Observable <Mensagem> {
    return this.httpCliente.get<Mensagem>(this.API + '/' + id);
  }

  public excluirMensagemPorId(idMensagem: string):
  Observable<any>{
    return this.httpCliente.delete<any>(this.API + '/' + idMensagem);
  }

  public marcarMensagemComoExcluida(idMensagem: string): Observable<any> {
    return this.httpCliente.get<any>(this.API + '/desativar/' + idMensagem);
  }

  public buscarTodasMensagensAtivas(): Observable<Array<Mensagem>> {
    return this.httpCliente.get<Array<Mensagem>>(this.API + '/ativas');
  }

  public bloquearMensagem(idMensagem: string): Observable <string> {
    return this.httpCliente.get<string>(this.API + '/bloquear/' + idMensagem);
  }

  public curtirMensagem(idMensagem: string): Observable <boolean> {
    return this.httpCliente.get<boolean>(this.API + '/curtir/' + idMensagem);
  }
}
