import { Component, inject, OnInit } from '@angular/core';
import { Usuario } from '../../../shared/model/entity/Usuario';
import { AuthorizationService } from '../../../shared/service/authorization/authorization.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeUserAdminComponent implements OnInit {
  constructor() {}

  private authorizationService = inject(AuthorizationService);

  private usuario = new Usuario();

  ngOnInit(): void {}
}
