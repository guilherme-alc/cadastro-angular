import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-consulta',
  imports: [
    FlexLayoutModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule
  ],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})

export class ConsultaComponent {
  dataSource = new MatTableDataSource<Cliente>();
  displayedColumns: string[] = ['id', 'nome', 'email', 'cpf', 'acoes'];
  valorPesquisa: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: ClienteService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.dataSource.data = this.service.pesquisarClientes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  protected pesquisar(nome: string) : void {
    this.dataSource.data = this.service.pesquisarClientes(nome);
  }

  protected prepararEdicao(cliente: Cliente) : void {
    this.router.navigate(
      ['/cadastro'],
      {
        state: cliente
      }
    );
  }

  protected excluir(cliente: Cliente) : void {
    try {
      if(confirm('Deseja realmente excluir este cliente?')) {
        this.service.excluir(cliente.id);
        this.dataSource.data = this.service.pesquisarClientes(this.valorPesquisa);
      }
    }
    catch (e: any) {
      if(e && e.message === 'Cliente não encontrado para exclusão') {
        this.snackBar.open('Cliente não encontrado para atualização.', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
      }
      else {
        this.snackBar.open('Erro ao salvar cliente.', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
      }
    }
  }
}
