import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForm, FormsModule } from '@angular/forms';
import { Cliente, createCliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';
import { BrasilApiService } from '../../services/brasil-api.service';
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaskDirective, provideNgxMask, NgxMaskService } from 'ngx-mask';
import { Estado, Municipio } from '../../models/brasilApi.models';
import { MatSelectModule } from '@angular/material/select';

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
    MatSelectModule,
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
  protected ufs: Estado[] = [];
  protected municipios: Municipio[] = [];

  @ViewChild('clientesFrm') clientesFrm?: NgForm;

  constructor (
    private service: ClienteService,
    private brasilApiService: BrasilApiService,
    private snackBar: MatSnackBar,
    private maskService: NgxMaskService) { }

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

    this.carregarUFs();
    if(this.modoEdicao)
      this.carregarMunicipios(this.cliente.uf);
  }

  protected onDataInput(e: Event): void {
    const inp = e.target as HTMLInputElement;
    inp.value = this.maskService.applyMask(inp.value, '00/00/0000');
  }

  protected carregarUFs(): void {
    // observable -> publish-subscribe
    // requisição assíncrona -> resposta chega depois
    // realiza a requisição e se inscreve para receber a resposta quando chegar
    this.brasilApiService.getUFs().subscribe({
      // oque fazer quando chegar a resposta
      next: (retornoEstados) => {
        this.ufs = retornoEstados;
      },

      error: (err) => {
        this.snackBar.open('Erro ao carregar UFs.', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
      }
    });
  }

  protected carregarMunicipios(uf: string): void {
    this.brasilApiService.getMunicipios(uf).subscribe({
      next: (retornoMunicipios) => {
        this.municipios = retornoMunicipios;
      }
    })
  }

  trackById(index: number, item: Estado): number {
    return item.id;
  }
}
