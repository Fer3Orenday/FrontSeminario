import { Component, OnInit } from '@angular/core';
import { RegistrosService } from '../services/registros.service';

@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.component.html',
  styleUrl: './cotizaciones.component.css'
})
export class CotizacionesComponent implements OnInit {
  user: any;
  registros: any;

  constructor(
    private registrosService: RegistrosService,
  ) {
    let userExist = localStorage.getItem('user');
    this.user = userExist ? JSON.parse(userExist) : '';
  }

  ngOnInit(): void {
    this.loadRegistros();
  }

  loadRegistros(): void {
  
    
    this.registrosService.getRegistro().subscribe(
      (data) => {
        // Filtrar los registros para excluir el usuario logueado
        this.registros = data.filter(registro => registro.user === this.user.email);
        
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getTypeLabel(type: string): string {
    switch (type) {
      case 'homeValue':
        return 'Basado en Valor de Vivienda';
      case 'salary':
        return 'Basado en Salario';
    }
    return '';
  }

}
