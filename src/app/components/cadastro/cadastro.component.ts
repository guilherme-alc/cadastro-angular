import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForm, FormsModule } from '@angular/forms';
import { Cliente, createCliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

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
    MatNativeDateModule,
    NgxMaskDirective
  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})

export class CadastroComponent {
  protected cliente: Cliente = createCliente();
  protected modoEdicao: boolean = false;

  @ViewChild('clientesFrm') clientesFrm?: NgForm;

  constructor (
    private service: ClienteService,
    private snackBar: MatSnackBar) { }

  protected enviarCliente() : void {
    try {
      if(!this.modoEdicao) {
        this.service.cadastrar(this.cliente);

        this.cliente = createCliente();
        this.clientesFrm?.resetForm(this.cliente);

        this.snackBar.open('Cliente cadastrado com sucesso.', undefined, {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
        return;
      }

      this.service.atualizar(this.cliente);

      this.snackBar.open('Cliente atualizado com sucesso.', undefined, {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top'
      });

    } catch (e: any) {
      if (e && e.message === 'Email já cadastrado') {
        this.snackBar.open('Este e-mail já está cadastrado.', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });

      } else if (e && e.message === 'Cliente não encontrado para atualização') {
        this.snackBar.open('Cliente não encontrado para atualização.', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });

      } else {
        this.snackBar.open('Erro ao salvar cliente.', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
      }
    }
  }

  ngOnInit() {
    const clienteEdit = history.state as Cliente;
    if (clienteEdit?.id) {
      this.cliente = clienteEdit;
      this.modoEdicao = true;
    }
  }
}
