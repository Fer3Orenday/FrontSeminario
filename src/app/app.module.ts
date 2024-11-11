import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AdministradorComponent } from './administrador/administrador.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms'; 
import { RegistroComponent } from './registro/registro.component';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MenuUsuarioComponent } from './menu-usuario/menu-usuario.component';
import { CotizacionesComponent } from './cotizaciones/cotizaciones.component';
import { PerfumeInterceptor } from './perfume-interceptor.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    CalculadoraComponent,
    AdministradorComponent,
    NavBarComponent,
    MenuUsuarioComponent,
    CotizacionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    { provide: HTTP_INTERCEPTORS, useClass: PerfumeInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
