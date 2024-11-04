import { UsuarioDTO } from './../shared/model/dto/UsuarioDTO';
import { Component } from '@angular/core';
//import { UsuarioDTO } from '../shared/model/dto/UsuarioDTO';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

constructor(usuarioDTO: UsuarioDTO){}

//function realizarLogin(UsuarioDTO: UsuarioDTO) {

//}

}
