import { Injectable } from '@angular/core';
@Injectable()

export class DataStorageService {
  private data = [];

  constructor() {

  }
  
  get(dataName){
    console.log(this.data)
    return this.data[dataName];
  }

  set(dataName,dataValue){
    this.data[dataName] = dataValue;
    console.log('data-storaged',this.data);
  }

  clear(){
    this.data = [];
    console.log(this.data);
  }
  
  clearByIndex(index){
    delete this.data[index];
    console.log(this.data);
  }
}