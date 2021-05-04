import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrudCardPage } from './crud-card.page';

const routes: Routes = [
  {
    path: '',
    component: CrudCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudCardPageRoutingModule {}
