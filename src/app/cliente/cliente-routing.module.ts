import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientePage } from './cliente.page';

const routes: Routes = [
  {
    path: '',
    component: ClientePage
  },  {
    path: 'crud-cliente',
    loadChildren: () => import('./crud-cliente/crud-cliente.module').then( m => m.CrudClientePageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientePageRoutingModule {}
