import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeUserAdminComponent } from './components/usuario-admin/home/home.component';
import { HomeUserCommomComponent } from './components/usuario-comum/home/home.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'home-user-admin', component: HomeUserAdminComponent },
  { path: 'home-user-commom', component: HomeUserCommomComponent },
];
