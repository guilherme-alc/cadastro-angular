import { v4 as uuid } from 'uuid'

export interface Cliente {
  id: string;
  nome: string;
  cpf: string;
  dataNascimento: Date | null;
  email: string;
}

export function createCliente(): Cliente {
  return {
    id: uuid(),
    nome: '',
    cpf: '',
    dataNascimento: null,
    email: ''
  };
}
