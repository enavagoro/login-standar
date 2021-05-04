import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrudClientePageRoutingModule } from './crud-cliente-routing.module';

import { CrudClientePage } from './crud-cliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrudClientePageRoutingModule
  ],
  declarations: [CrudClientePage]
})
export class CrudClientePageModule {}
