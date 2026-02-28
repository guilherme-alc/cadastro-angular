import { Routes } from '@angular/router';
import { CadastroComponent } from './components/cadastro/cadastro.component'
import { ConsultaComponent } from './components/consulta/consulta.component';

export const routes: Routes = [
  { path: 'cadastro', component: CadastroComponent, title: 'Cadastro de Clientes' },
  { path: 'consulta', component: ConsultaComponent, title: 'Consulta de Clientes' }
];
