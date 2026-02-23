import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor() { }

  private static readonly REPO_CLIENTES : string = "_CLIENTES";

  public salvar(cliente: Cliente) {
    const repositorio = this.obterClientesStorage();
    repositorio.push(cliente);

    localStorage.setItem(
      ClienteService.REPO_CLIENTES,
      JSON.stringify(repositorio)
    );
  }

  public obterClientesStorage() : Cliente[] {
    const repositorio = localStorage.getItem(ClienteService.REPO_CLIENTES);

    if (!repositorio) return [];

    return (JSON.parse(repositorio) as Cliente[]).map(c => ({
      ...c,
      dataNascimento: c.dataNascimento
        ? new Date(c.dataNascimento)
        : null
    }));
  }
}
