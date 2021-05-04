import { Component, OnInit } from '@angular/core';
import { CardService } from '../_services/card.service';
import { DataStorageService } from '../_services/dataStorage.service';
//import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ModalController ,ToastController, AlertController,ActionSheetController} from '@ionic/angular';
import { CrudCardPage } from './crud-card/crud-card.page';

@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
})
  
  export class CardPage implements OnInit {
    receptors = [];
    seeAll = false;
    cards = [];
    searchQuery = "";
    filteredCards = [];
    variable = false;
    titleMaxValue = 34;

    constructor(private router:Router, private dataStorage: DataStorageService, private modalCtrl : ModalController, private alertController : AlertController, private actionSheetController:ActionSheetController, private cardService:CardService) { }
  
    ngOnInit() {
      this.cardService.list().then(servicio=>{
        servicio.subscribe(datos=>{
          console.log('estos son los datos que llegan',datos);
          this.cards =  datos;
          this.filteredCards = datos;
        })
      })
      
      /*var val = this.dataStorage.get('user');
      if(val){
  
      }
      else{
        this.router.navigate(['/login'], {replaceUrl: true});
      }*/
    }
  
    filterCards(){
      var cards = [];
      for(let i = 0 ; i < this.filteredCards.length ; i ++){
        if(this.filteredCards[i].status){ /* && i < this.cantidadVisible */
          cards.push(this.filteredCards[i]);
        }
      }
      return cards;
    }
  
    filterDesactivated(){
      var cards = [];
      for(let i = 0 ; i < this.filteredCards.length ; i ++){
        if(!this.filteredCards[i].status){
          cards.push(this.filteredCards[i]);
        }
      }
      return cards;
    }
  
    filter(ev){
      /*console.log(this.searchQuery);*/
      if(this.searchQuery){          
        var filteredValues = [];
        for(var card of this.cards){
          for(var index in card){
            if(card[index].toString().toLowerCase().includes(this.searchQuery.toLowerCase())){
              filteredValues.push(card);
              break;
            }
          }
        }
      }
      this.filteredCards = filteredValues;
      if(this.searchQuery.trim() == ''){
        this.filteredCards = this.cards;          
      }
    }

    maxSizeString(text,size){

      return text.slice(0,size);
    }
  
    async options(card) {
      var option = "Borrar";
  
      if(card.status == 0){
        option = "Recuperar"
      }
  
      const actionSheet = await this.actionSheetController.create({
        header: 'Opciones',
        buttons: [{
          text: 'Editar Cardo',
          icon: 'brush-outline',
          handler: () => {
            this.editCard(card,2);
          }
        },{
          text: option,
          role: 'destructive',
          icon: 'trash-outline',
          handler: () => {
            if(card.status == 0){
              this.confirmDelete('recuperar',card);
            }
            else{
              this.confirmDelete('borrar',card);            
            }
          }
        },{
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            
          }
        }]
      });
      await actionSheet.present();
    }
  
    /* modales */
  
    async editCard(card,value) {
      const modal = await this.modalCtrl.create({
        component: CrudCardPage,
        cssClass: 'modals',
        componentProps:{
          'card' : card,
          'value' : value
        }
      });
  
      modal.onDidDismiss().then(modal=>{
        
        this.ngOnInit();
      });
  
      return await modal.present();
    }
  
    async addCard(value) {
      const modal = await this.modalCtrl.create({
          component: CrudCardPage,
          cssClass: 'modals',
          componentProps:{
            'value' : value
          }
      });
  
      modal.onDidDismiss().then(modal=>{
        
        this.ngOnInit();
      });
  
      return await modal.present();
    }
  
    async confirmDelete(option,card) {
      //console.log(this.cliente);
      card;
  
      const alert = await this.alertController.create({
        header: 'Favor confirmar!',
        message: 'Estas a punto de <br><strong>'+option+' UN CONTACTO</strong>!!!',
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
              this.deleteAndRecovery(option,card);
            }
          }
        ]
      });
  
      await alert.present();
    }

    changeStatus(status){
      this.seeAll = status;
    }
  
    deleteAndRecovery(option,card){
      card['status'] = !card['status'] ;
      this.cardService.update(card['_id'],card).subscribe(card=>{
        //console.log(card);
        //this.ngOnInit();
      })
    }
  }
