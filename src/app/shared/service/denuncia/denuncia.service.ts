import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Denuncia } from '../../model/entity/Denuncia';

@Injectable({
  providedIn: 'root'
})
export class DenunciaService {

  private readonly API = 'http://localhost:8080/opombo/api/denuncia';

  constructor(private httpCliente: HttpClient) { }

  public buscarTodas(): Observable<Array<Denuncia>>{
    return this.httpCliente.get<Array<Denuncia>>(this.API);
  }
}
