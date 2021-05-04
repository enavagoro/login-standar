import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrudClientePage } from './crud-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: CrudClientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudClientePageRoutingModule {}
