import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { RegistroComponent } from './registro/registro.component';
import { AuthGuard } from './auth.guard';
import { MenuUsuarioComponent } from './menu-usuario/menu-usuario.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'administrador', component: AdministradorComponent, canActivate: [AuthGuard] },
  { path: 'calculadora', component: CalculadoraComponent, canActivate: [AuthGuard] },
  { path: 'menu', component: MenuUsuarioComponent, canActivate: [AuthGuard] },

  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
