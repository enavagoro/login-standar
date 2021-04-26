import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { LoginService } from '../_services/login.service';
import { ValidationService } from '../_services/validation.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    let codigoEnter = 13;

    if(event.keyCode == codigoEnter){
      this.login();
    }
  }
  loginForm;
  
  
  constructor(private loginService: LoginService,
              private authService: AuthService,
              private router:Router,
              public alertController:AlertController,
              private formBuilder:FormBuilder) { 
                this.loginForm = this.formBuilder.group({
                  email : ['',[Validators.required,ValidationService.emailValidator]],
                  password : ['',Validators.required]
                }); 
              }

  ngOnInit() {
    console.log('aqui estoy');

    var menu = document.querySelector('ion-menu');
    menu.hidden = true;
    menu.close();
  }

  test(){
    console.log('this.loginForm.value::',this.loginForm.value);
  }

  login(){
    this.authService.logUser(this.loginForm.value).then(service=>{
      service.subscribe(d=>{
        console.log(d);
        this.loginService.setToken(d['accessToken']);
        this.loginService.getUser(this.loginForm.value).then(logService=>{
          logService.subscribe(r=>{
            console.log('yo soy r',r);
            for(var user of r){
              user.token = d['accessToken'];
              this.loginService.setUser(user);
              this.loginService.setEnterprise(user.enterpriseId);
              //this.router.navigate(['example'], {replaceUrl: true});
              // aqui navega donde deberia navegar
            }
          })
        })
      },err=>{
        this.errorAlert();
      })
    })
  }

  async errorAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      subHeader: 'Error al iniciar',
      message: 'Tu dirección de correo electrónico o tu contraseña no son correctos',
      buttons: ['OK']
    });
    await alert.present();
  }
}
