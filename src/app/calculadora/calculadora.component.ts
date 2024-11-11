import { Component, OnInit } from '@angular/core';
import { RegistrosService } from '../services/registros.service';
import { BancosService } from '../services/bancos.service';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent implements OnInit {
  loanType: string = 'homeValue'; // Tipo de préstamo, puede ser 'homeValue' o 'salary'
  amount: number = 0; // Monto total del préstamo o valor de la casa
  salary: number = 0; // Salario del cliente, para el cálculo de préstamo basado en salario
  institution: number = 0; // Institución seleccionada
  loanTerm: number = 15; // Plazo del préstamo en años
  amortizationTable: any[] = []; // Tabla de amortización a generar
  amountBasedOnSalary: number = 0; // Monto calculado basado en salario (solo para salario)
  amountBasedOnHomeValue: number = 0; // Monto calculado basado en el valor de la propiedad
  downPaymentAmount: number = 0;
  maxAffordableMonthlyPayment: number = 0; // Máximo pago mensual que no excede el 40% del salario
  user: any;
  totalPayment: number = 0; // Total a pagar
  bancos: any[] = [];

  constructor(private registrosService: RegistrosService, private bancosService: BancosService) {
    let userExist = localStorage.getItem('user');
    this.user = userExist ? JSON.parse(userExist) : '';
  }

  ngOnInit(): void {
    this.obtenerBancos();
  }

  obtenerBancos() {
    this.bancosService.getBancos().subscribe({
      next: (response) => {
        console.log(response);
        this.bancos = response;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  calculateLoanBasedOnHomeValue(homeValue: number): number {
    const selectedInstitution = this.bancos[this.institution];
    this.downPaymentAmount = (homeValue * parseFloat(selectedInstitution.enganche)) / 100;
    const loanAmount = homeValue - this.downPaymentAmount;
    return loanAmount;
  }

  onInstitutionChange() {
    this.loanTerm = this.bancos[this.institution].anio[0];
    this.calculateLoan();
  }

  calculateLoan() {
    let principal: number = 0;

    if (this.loanType === 'homeValue') {
      const selectedInstitution = this.bancos[this.institution];
      this.downPaymentAmount = (this.amount * parseFloat(selectedInstitution.enganche)) / 100;
      principal = this.amount - this.downPaymentAmount;
      this.amountBasedOnHomeValue = principal;
    } else if (this.loanType === 'salary') {
      // Calculo para préstamo basado en salario
      const selectedInstitution = this.bancos[this.institution];
      const annualInterestRate = parseFloat(selectedInstitution.interes) / 100;
      const monthlyInterestRate = annualInterestRate / 12;
      const totalPayments = this.loanTerm * 12;

      // Máximo pago mensual permitido (40% del salario bruto)
      this.maxAffordableMonthlyPayment = (this.salary * 0.4);

      // Calculo del principal basado en el pago mensual máximo
      principal = (this.maxAffordableMonthlyPayment * (1 - Math.pow(1 + monthlyInterestRate, -totalPayments))) / monthlyInterestRate;
      this.downPaymentAmount = principal * parseFloat(selectedInstitution.enganche) / 100;
      this.amountBasedOnSalary = principal;
    }

    if (principal > 0) {
      const selectedInstitution = this.bancos[this.institution];
      const annualInterestRate = parseFloat(selectedInstitution.interes) / 100;
      const monthlyInterestRate = annualInterestRate / 12;
      const totalPayments = this.loanTerm * 12;

      const monthlyPayment = (principal * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -totalPayments));
      this.amortizationTable = this.generateAmortizationTable(principal, monthlyInterestRate, totalPayments, monthlyPayment);

      // Calcula el total de pagos
      this.totalPayment = monthlyPayment * totalPayments;
    }
  }

  generateAmortizationTable(principal: number, monthlyInterestRate: number, totalPayments: number, monthlyPayment: number) {
    const table = [];
    let balance = principal;

    for (let i = 1; i <= totalPayments; i++) {
      const interest = balance * monthlyInterestRate;
      const capital = monthlyPayment - interest;
      balance -= capital;

      table.push({
        month: i,
        downPayment: this.downPaymentAmount.toFixed(2),
        monthlyPayment: monthlyPayment.toFixed(2),
        interest: interest.toFixed(2),
        capital: capital.toFixed(2),
        balance: Math.max(balance, 0).toFixed(2)
      });
    }
    return table;
  }

  saveData() {
    const registro = {
      user: this.user.email,
      type: this.loanType,
      amount: this.loanType === 'homeValue' ? this.amount : this.salary,
      institution: this.bancos[this.institution].nombre,
      years: this.loanTerm,
      montoPrestamo: this.amountBasedOnHomeValue,
      enganche: this.downPaymentAmount,
      totalPagar: this.totalPayment,
    };

    this.registrosService.registro(registro).subscribe({
      next: (response) => {
        alert('Se ha compartido la información con un administrador, se pondrán en contacto más adelante...')
      },
      error: (error) => {
        alert('Ha ocurrido un error: ' + error.error);
        console.log(error.error);
      }
    });
  }
}