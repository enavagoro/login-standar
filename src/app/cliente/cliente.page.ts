import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../_services/cliente.service';
import { DataStorageService } from '../_services/dataStorage.service';
//import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ModalController ,ToastController, AlertController,ActionSheetController} from '@ionic/angular';
import { CrudClientePage } from './crud-cliente/crud-cliente.page';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
  
  export class ClientePage implements OnInit {
    receptors = [];
    seeAll = false;
    clientes = [];
    searchQuery = "";
    filteredClientes = [];
    variable = false;
    titleMaxValue = 34;

    constructor(private router:Router, private dataStorage: DataStorageService, private modalCtrl : ModalController, private alertController : AlertController, private actionSheetController:ActionSheetController, private clienteService:ClienteService) { }
  
    ngOnInit() {  
      var val = this.dataStorage.get('user');
      if(val){
        this.clienteService.list().then(servicio=>{
          servicio.subscribe(data=>{
            console.log('estos son los datos que llegan',data);
            this.clientes =  data;
            this.filteredClientes = data;
          })
        })
      }
      else{
        this.router.navigate(['/login'], {replaceUrl: true});
      }
    }
  
    filterClientes(){
      var clientes = [];
      for(let i = 0 ; i < this.filteredClientes.length ; i ++){
        if(this.filteredClientes[i].status){ /* && i < this.cantidadVisible */
          clientes.push(this.filteredClientes[i]);
        }
      }
      return clientes;
    }
  
    filterDesactivated(){
      var clientes = [];
      for(let i = 0 ; i < this.filteredClientes.length ; i ++){
        if(!this.filteredClientes[i].status){
          clientes.push(this.filteredClientes[i]);
        }
      }
      return clientes;
    }
  
    filter(ev){
      /*console.log(this.searchQuery);*/
      if(this.searchQuery){          
        var filteredValues = [];
        for(var cliente of this.clientes){
          for(var index in cliente){
            if(cliente[index].toString().toLowerCase().includes(this.searchQuery.toLowerCase())){
              filteredValues.push(cliente);
              break;
            }
          }
        }
      }
      this.filteredClientes = filteredValues;
      if(this.searchQuery.trim() == ''){
        this.filteredClientes = this.clientes;          
      }
    }

    maxSizeString(text,size){

      return text.slice(0,size);
    }
  
    async options(cliente) {
      var option = "Borrar";
  
      if(cliente.status == 0){
        option = "Recuperar"
      }
  
      const actionSheet = await this.actionSheetController.create({
        header: 'Opciones',
        buttons: [{
          text: 'Editar Cliente',
          icon: 'brush-outline',
          handler: () => {
            this.editCliente(cliente,2);
          }
        },{
          text: option,
          role: 'destructive',
          icon: 'trash-outline',
          handler: () => {
            if(cliente.status == 0){
              this.confirmDelete('recuperar',cliente);
            }
            else{
              this.confirmDelete('borrar',cliente);            
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
  
    async editCliente(cliente,value) {
      const modal = await this.modalCtrl.create({
        component: CrudClientePage,
        cssClass: 'modals',
        componentProps:{
          'cliente' : cliente,
          'value' : value
        }
      });
  
      modal.onDidDismiss().then(modal=>{
        
        this.ngOnInit();
      });
  
      return await modal.present();
    }
  
    async addCliente(value) {
      const modal = await this.modalCtrl.create({
          component: CrudClientePage,
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
  
    async confirmDelete(option,cliente) {
      //console.log(this.cliente);
      cliente;
  
      const alert = await this.alertController.create({
        header: 'Favor confirmar!',
        message: 'Estas a punto de <br><strong>'+option+' un Cliente</strong>!!!',
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
              this.deleteAndRecovery(option,cliente);
            }
          }
        ]
      });
  
      await alert.present();
    }

    changeStatus(status){
      this.seeAll = status;
    }
  
    deleteAndRecovery(option,cliente){
      cliente['status'] = !cliente['status'] ;
      this.clienteService.update(cliente['_id'],cliente).subscribe(cliente=>{
        //console.log(cliente);
        //this.ngOnInit();
      })
    }
  }
