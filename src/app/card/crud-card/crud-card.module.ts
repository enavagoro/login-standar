import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrudCardPageRoutingModule } from './crud-card-routing.module';

import { CrudCardPage } from './crud-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrudCardPageRoutingModule
  ],
  declarations: [CrudCardPage]
})
export class CrudCardPageModule {}
