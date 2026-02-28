import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor() { }

  private static readonly REPO_CLIENTES : string = "_CLIENTES";

  public cadastrar(cliente: Cliente): void {
    try {
      const repositorio = this.obterClientesStorage();

      const emailNormalizado = cliente.email?.toLowerCase().trim() || '';
      const existeEmail = repositorio.some(c =>
        (c.email?.toLowerCase().trim() || '') === emailNormalizado
      );

      if (existeEmail) {
        throw new Error('Email já cadastrado');
      }

      repositorio.push(cliente);

      localStorage.setItem(
        ClienteService.REPO_CLIENTES,
        JSON.stringify(repositorio)
      );
    } catch (e) {
      console.error('Erro ao cadastrar cliente', e);
      throw e;
    }
  }

  public atualizar(cliente: Cliente): void {
    try {
      const repositorio = this.obterClientesStorage();

      const index = repositorio.findIndex(c => c.id === cliente.id);
      if (index === -1) {
        throw new Error('Cliente não encontrado para atualização');
      }

      repositorio[index] = cliente;

      localStorage.setItem(
        ClienteService.REPO_CLIENTES,
        JSON.stringify(repositorio)
      );
    } catch (e) {
      console.error('Erro ao atualizar cliente', e);
      throw e;
    }
  }

  public pesquisarClientes(nome?:string): Cliente[] {
    const clientes = this.obterClientesStorage();

    if (!nome)
      return clientes;

    return clientes.filter(c => c.nome?.toLowerCase().trim().includes(nome.toLowerCase().trim()) || false);
  }

  private obterClientesStorage(): Cliente[] {
    try {
      const repositorio = localStorage.getItem(ClienteService.REPO_CLIENTES);

      if (!repositorio) return [];

      return (JSON.parse(repositorio) as Cliente[]).map(c => ({
        ...c,
        dataNascimento: c.dataNascimento
          ? new Date(c.dataNascimento)
          : null
      }));
    } catch (e) {
      console.error('Erro ao ler clientes do storage', e);
      return [];
    }
  }
}
