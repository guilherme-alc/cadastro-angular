import { v4 as uuid } from 'uuid'

export interface Cliente {
  id: string;
  nome: string;
  cpf: string;
  dataNascimento: Date | null;
  email: string;
  uf: string;
  municipio: string;
}

export function createCliente(): Cliente {
  return {
    id: uuid(),
    nome: '',
    cpf: '',
    dataNascimento: null,
    email: '',
    uf: '',
    municipio: ''
  };
}
