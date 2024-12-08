import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Denuncia } from '../../model/entity/Denuncia';
import { DenunciaSeletor } from '../../model/seletor/denunciaSeletor';

@Injectable({
  providedIn: 'root'
})
export class DenunciaService {

  private readonly API = 'http://localhost:8080/opombo/denuncia';

  constructor(private httpCliente: HttpClient) { }

  public buscarTodas(): Observable<Array<Denuncia>>{
    return this.httpCliente.get<Array<Denuncia>>(this.API);
  }

  public consultarPorId(id: number): Observable<Denuncia> {
    return this.httpCliente.get<Denuncia>(this.API + '/' + id);
  }

  public denunciar(denuncia: Denuncia): Observable<Denuncia> {
    return this.httpCliente.post<Denuncia>(this.API, denuncia)
  }


  public consultarComSeletor(seletor: DenunciaSeletor): Observable<Array<Denuncia>> {
    return this.httpCliente.post<Array<Denuncia>>(this.API + '/filtro', seletor);
  }

  public analisar(denuncia: Denuncia): Observable<Denuncia> {
    return this.httpCliente.post<Denuncia>(this.API, denuncia);
  }

  public bloquearMensagem(idMensagem: string): Observable <string> {
    return this.httpCliente.get<string>(this.API + '/bloquear/' + idMensagem);
  }

  public aceitarDenuncia(idDenuncia: number): Observable<boolean> {
    return this.httpCliente.post<boolean>(this.API + '/aceitarDenuncia/' + idDenuncia, {});
  }

  public rejeitarDenuncia(idDenuncia: number): Observable<boolean> {
    return this.httpCliente.post<boolean>(this.API + '/rejeitarDenuncia/' + idDenuncia, {});
  }

  // contarRegistros(seletor: DenunciaSeletor): Observable<number>{
  //   return this.httpCliente.post<number>(this.API + '/contar', seletor)
  // }

  contarPaginas(seletor: DenunciaSeletor): Observable<number>{
    return this.httpCliente.post<number>(this.API + '/total-paginas', seletor)
  }
}
