import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../_services/cliente.service';
import { DataStorageService } from '../_services/dataStorage.service';
import { ExcelService } from '../_services/excel.service';
//import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ModalController ,ToastController, AlertController,ActionSheetController} from '@ionic/angular';
import { CrudClientePage } from './crud-cliente/crud-cliente.page';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
    seeSubOptions = false;

    currentPage = 1;
    firstPage = 0;
    lastPage = 0;
    pages = [];
    productsPerPage = 10;

    from = (this.currentPage - 1) * this.productsPerPage;
    to = this.currentPage * this.productsPerPage;  

    constructor(private router:Router, private dataStorage: DataStorageService, private modalCtrl : ModalController, private alertController : AlertController, private actionSheetController:ActionSheetController, private clienteService:ClienteService, private excelService:ExcelService) { }
  
    ngOnInit() {
      var val = this.dataStorage.get('user');

      if(val){          
        this.clienteService.list().then(servicio=>{
          servicio.subscribe(data=>{
            console.log('estos son los datos que llegan',data);
            this.clientes =  data;
            this.filteredClientes = data;
            this.startPaginator();
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

      this.startPaginator();
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

    exportExcel(){
      var toExport = [];
      for(var client of this.filteredClientes){
        //var item = {Nombre : cliente.nombre,Rut:cliente.rut,URL:cliente.url,Panel:cliente.panel,Email:cliente.email,Ecommerce:cliente.tipo_ecommerce,Suite:cliente.tipo_suite ,"Razon Social":cliente.razon_social,"Etapa cliente":cliente.etapa_cliente};
        var item = client;
        toExport.push(item);      
      }
      this.excelService.exportAsExcelFile(toExport, 'Resumen cliente ');
    }

    changeListStatus(status){
      this.seeAll = status;
      this.startPaginator();
    }

    changeSeeSubOptionsStatus(){
      this.seeSubOptions = !this.seeSubOptions;
    }
  
    deleteAndRecovery(option,cliente){
      cliente['status'] = !cliente['status'] ;
      this.clienteService.update(cliente['_id'],cliente).subscribe(cliente=>{
        //console.log(cliente);
        //this.ngOnInit();
        this.startPaginator()
      })
    }

    async generalSettings() {
      var option = '';
      var seeAllStatus = !this.seeAll;
      if(this.seeAll){
        option = 'activos'
      }else{
        option = 'desactivados'
      }

      const actionSheet = await this.actionSheetController.create({
        header: 'Opciones',
        buttons: [
          {
            text: 'Mostrar clientes '+option,
            icon: 'list',
            handler: () => {
              this.changeListStatus(seeAllStatus)
            }
          },        
          {
          text: 'Crear un nuevo cliente',
          icon: 'person-add',
          handler: () => {
            this.addCliente(1);
          }
        },
        {
          text: 'Descargar Excel',
          icon: 'document',
          handler: () => {
            
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            
          }
        }]
      });
      await actionSheet.present();
    }

    startPaginator(){
      console.log('aqui estamos');
      if(!this.seeAll){
        this.currentPage = 1;
        var total = this.filterClientes().length;
        var firstPage = 1;
        this.firstPage = firstPage;
        var limit = 10;
        var lastPage = Math.ceil(total / limit);
        this.lastPage = lastPage;
        this.pages = Array.from({length: lastPage}, (item, index) => index + 1);
        this.pages.shift();
        this.pages.pop();
        console.log('pages',this.pages);
        console.log('primera',firstPage,'ultima',lastPage);
        this.updateFilterRange()
      }else{
        console.log('entré');
        this.currentPage = 1;
        var total = this.filterDesactivated().length;
        var firstPage = 1;
        this.firstPage = firstPage;
        var limit = 10;
        var lastPage = Math.ceil(total / limit);
        this.lastPage = lastPage;
        this.pages = Array.from({length: lastPage}, (item, index) => index + 1);
        this.pages.shift();
        this.pages.pop();
        this.updateFilterRange()
        console.log('pages',this.pages);
        console.log('pages',this.pages);
        console.log('primera',firstPage,'ultima',lastPage);
      }
      
    }

    filterPages(){
      var tempArray = [];

      /*console.log('currentPage',this.currentPage);*/
      var actualValue = this.currentPage - 2;
      
      if(this.currentPage == this.firstPage){
          tempArray = this.pages.slice(0,2);
  
          return tempArray
      }
      else if(this.currentPage == this.lastPage) {
          tempArray = this.pages.slice(this.pages.length - 2 ,this.pages.length);
  
          return tempArray
      }
      else{
          if(this.pages[actualValue - 1]){
              tempArray.push(this.pages[actualValue - 1])
          }
          tempArray.push(this.pages[actualValue]);        
          if(this.pages[actualValue + 1]){
              tempArray.push(this.pages[actualValue + 1])
          }
  
          return tempArray
      }
    }
  
    previousPage(){
      this.currentPage = this.currentPage - 1;
      this.updateFilterRange();
      //console.log('productosFiltrados',this.filteredProducts)
    }
  
    selectPage(page){
      this.currentPage = page;
      this.updateFilterRange();
      //console.log('productosFiltrados',this.filteredProducts);
    };
  
    nextPage(){
      this.currentPage = this.currentPage + 1;
      this.updateFilterRange();
      //console.log('productosFiltrados',this.filteredProducts)
    }

    updateFilterRange(){
      this.from = (this.currentPage - 1) * this.productsPerPage;
      this.to = this.currentPage * this.productsPerPage;
      console.log('from',this.from,'to',this.to)
    }
  }
