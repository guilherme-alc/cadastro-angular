import { Cliente, createCliente } from '../../models/cliente';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-cadastro',
  imports: [
    FormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})

export class CadastroComponent {
  protected cliente: Cliente = createCliente();

  constructor (private service: ClienteService) { }

  protected salvarCliente() {
    this.service.salvar(this.cliente);
  }
}
