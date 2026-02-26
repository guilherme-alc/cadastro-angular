import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForm, FormsModule } from '@angular/forms';
import { Cliente, createCliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatNativeDateModule } from '@angular/material/core';
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatNativeDateModule
  ],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})

export class CadastroComponent {
  public cliente: Cliente = createCliente();
  @ViewChild('clientesFrm') clientesFrm?: NgForm;
  constructor (private service: ClienteService, private snackBar: MatSnackBar) { }

  public salvarCliente() {
    try {
      this.service.salvar(this.cliente);
      this.cliente = createCliente();

      this.clientesFrm?.resetForm(this.cliente);
      this.snackBar.open('Cliente salvo com sucesso.', undefined, {
        duration: 3500,
        horizontalPosition: 'end',
        verticalPosition: 'top'
      });
    } catch (e: any) {
      if (e && e.message === 'Email já cadastrado') {
        this.snackBar.open('Este e-mail já está cadastrado.', 'Fechar', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
      } else {
        this.snackBar.open('Erro ao salvar cliente. Veja console.', 'Fechar', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
      }
    }
  }
}
