import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardPage } from './card.page';

const routes: Routes = [
  {
    path: '',
    component: CardPage
  },  {
    path: 'crud-card',
    loadChildren: () => import('./crud-card/crud-card.module').then( m => m.CrudCardPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardPageRoutingModule {}
