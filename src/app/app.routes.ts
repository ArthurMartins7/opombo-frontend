import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeUserAdminComponent } from './components/usuario-admin/home/home.component';
import { HomeUserCommomComponent } from './components/usuario-comum/home/home.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { Component } from '@angular/core';
import { UsuarioDetalheComponent } from './components/usuario-detalhe/usuario-detalhe.component';
import { GerenciarDenunciaComponent } from './components/gerenciar-denuncia/gerenciar-denuncia.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'home-user-admin',
    loadComponent: () =>
      import('./components/usuario-admin/home/home.component').then(
        (m) => m.HomeUserAdminComponent
      ), },
  { path: 'home-user-commom', component: HomeUserCommomComponent },
  { path: 'usuario-detalhe', component: UsuarioDetalheComponent},
  { path: 'gerenciar-denuncia/:id', component: GerenciarDenunciaComponent}
];
