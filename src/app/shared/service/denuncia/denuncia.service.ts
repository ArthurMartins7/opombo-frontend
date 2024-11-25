<<<<<<< HEAD
import { Injectable } from '@angular/core';
=======
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Denuncia } from '../../model/entity/Denuncia';
>>>>>>> 922745a21500b5c252e0cde64b138528357d03e4

@Injectable({
  providedIn: 'root'
})
export class DenunciaService {

<<<<<<< HEAD
  constructor() { }
=======
  private readonly API = 'http://localhost:8080/opombo/api/denuncia';

  constructor(private httpCliente: HttpClient) { }

  public buscarTodas(): Observable<Array<Denuncia>>{
    return this.httpCliente.get<Array<Denuncia>>(this.API);
  }
>>>>>>> 922745a21500b5c252e0cde64b138528357d03e4
}
