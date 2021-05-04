import { Component, OnInit } from '@angular/core';
import { ModalController ,ToastController,AlertController,ActionSheetController, NavParams} from '@ionic/angular';
import { ClienteService } from '../../_services/cliente.service';

@Component({
  selector: 'app-crud-cliente',
  templateUrl: './crud-cliente.page.html',
  styleUrls: ['./crud-cliente.page.scss'],
})
export class CrudClientePage implements OnInit {
  cliente = {};
  crudValue = 1;

  constructor(private modalCtrl : ModalController,private navParams : NavParams,private alertController : AlertController, private clienteService:ClienteService) {
    var ct = navParams.get("cliente");
    
    if(ct){
      this.cliente = ct;
    }

    var v = navParams.get("value");

    if(v){
      this.crudValue = v;
      if(v==2 || v == "2"){
        console.log("esta actualizando");
      }
    }
  }

  refrescar(event) {
    setTimeout(() => {

      event.target.complete();
    }, 2000);
  }

  public saveCliente(){
    //console.log('entra');
    this.clienteService.insert(this.cliente).subscribe(cliente=>{
      //console.log('entra2');
      //this.ngOnInit();
      this.cliente = {};
      this.closeModal();
    })
  }

  public updateCliente(){
    this.clienteService.update(this.cliente['_id'],this.cliente).subscribe(cliente=>{
      //console.log(cliente);
      //this.ngOnInit();
      this.closeModal();
      this.cliente = {};
    })
  }

  async confirmCreate() {
    //console.log(this.cliente);

    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>CREAR UN CONTACTO</strong>!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            //console.log('Cancelado');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.saveCliente();
          }
        }
      ]
    });

    await alert.present();
  } 
  
  async confirmUpdate() {
    //console.log(this.cliente);

    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>CREAR UN CONTACTO</strong>!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            //console.log('Cancelado');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.updateCliente();
          }
        }
      ]
    });

    await alert.present();
  }

  readCliente(){
    console.log('cliente',this.cliente);
  }

  ngOnInit() {
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

}
