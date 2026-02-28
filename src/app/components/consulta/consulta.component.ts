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
  ],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})

export class ConsultaComponent {
  dataSource = new MatTableDataSource<Cliente>();
  displayedColumns: string[] = ['id', 'nome', 'email', 'cpf', 'edicao'];
  valorPesquisa: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: ClienteService,
    private router: Router) {}

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
}
