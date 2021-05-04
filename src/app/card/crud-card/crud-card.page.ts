import { Component, OnInit } from '@angular/core';
import { ModalController ,ToastController,AlertController,ActionSheetController, NavParams} from '@ionic/angular';
import { CardService } from '../../_services/card.service';

@Component({
  selector: 'app-crud-card',
  templateUrl: './crud-card.page.html',
  styleUrls: ['./crud-card.page.scss'],
})
export class CrudCardPage implements OnInit {
  card = {};
  crudValue = 1;

  constructor(private modalCtrl : ModalController,private navParams : NavParams,private alertController : AlertController, private cardService:CardService) {
    var ct = navParams.get("card");
    
    if(ct){
      this.card = ct;
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

  public saveCard(){
    //console.log('entra');
    this.cardService.insert(this.card).subscribe(card=>{
      //console.log('entra2');
      //this.ngOnInit();
      this.card = {};
      this.closeModal();
    })
  }

  public updateCard(){
    this.cardService.update(this.card['_id'],this.card).subscribe(card=>{
      //console.log(card);
      //this.ngOnInit();
      this.closeModal();
      this.card = {};
    })
  }

  async confirmCreate() {
    //console.log(this.card);

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
            this.saveCard();
          }
        }
      ]
    });

    await alert.present();
  } 
  
  async confirmUpdate() {
    //console.log(this.card);

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
            this.updateCard();
          }
        }
      ]
    });

    await alert.present();
  }

  readCard(){
    console.log('card',this.card);
  }

  ngOnInit() {
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

}
