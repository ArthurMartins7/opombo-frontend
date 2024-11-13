import { Component } from '@angular/core';
import { Usuario } from '../shared/model/entity/Usuario';
import { LoginService } from '../shared/service/authentication.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {

  public usuario = new Usuario();

  constructor(private loginService: LoginService) {}

  public cadastrar() {
    this.loginService.
  }

}
