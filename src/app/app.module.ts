import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; //Protocolo http para que los servicios se comuniquen con la api
import { ReactiveFormsModule,FormsModule } from '@angular/forms'; //esto es para los formularios
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//servicios

import { AuthService } from './_services/auth.service';
import { LoginService } from './_services/login.service';
import { ValidationService } from './_services/validation.service';
import { DataStorageService } from './_services/dataStorage.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule ,HttpClientModule],
  providers: [
    AuthService,
    LoginService,
    DataStorageService,
    ValidationService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  schemas :[CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
