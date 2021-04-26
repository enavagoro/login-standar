import { Injectable } from '@angular/core';

const materias = ["materia1","materia2","m3"];
const partes = ['Recurrente','Demandante']; // traer desde db
const areas = [{id:0,text:"Civil Contenciosa -- (CC)"},{id:0,text:"Civil No Contenciosa -- (CNC)"},{id:0,text:"Constitucional -- (C)"},{id:0,text:"Extrajudicial -- (E)"},{id:0,text:"Familia -- (F)"},{id:0,text:"Laboral -- (L)"},{id:0,text:"Penal -- (P)"},{id:0,text:"Policía Local -- (PL)"},{id:0,text:"Otra -- (O)"}]
@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config = {
      required: 'Requerido',
      invalidName : ' No es un nombre valido o no tiene el tamaño correspondiente',
      invalidMatern : 'No es un apellido materno valido',
      invalidPatern : 'No es un apellido paterno valido',
      invalidMateria : 'No es una materia valida, escoje una de las opciones',
      invalidRut : 'No es un rut valido',
      invalidArea : 'No es un area valida',
      invalidParte : ' No es una parte valida, escoje una de las opciones',
      invalidCreditCard: 'Is invalid credit card number',
      invalidEmailAddress: 'Dirección de correo invalida',
      invalidPassword:
        'Invalid password. Password must be at least 6 characters long, and contain a number.',
      minlength: `Minimum length ${validatorValue.requiredLength}`
    };

    return config[validatorName];
  }
  static nameValidator(control){
    if(control.value.length > 4 ){
      return null;
    }else{
      return { invalidName : true }
    }
  }
  static creditCardValidator(control) {
    // Visa, MasterCard, American Express, Diners Club, Discover, JCB
    if (
      control.value.match(
        /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/
      )
    ) {
      return null;
    } else {
      return { invalidCreditCard: true };
    }
  }
  static materiaValidator(control){
    if(materias.includes(control.value.text) ){
      return null;
    }else{
      return {invalidMateria : true};
    }
  }
  static areaValidator(control){
    if(areas.includes(control.value.text) ){
      return null;
    }else{
      return {invalidArea : true};
    }
  }
  static parteValidator(control){
    if(partes.includes(control.value.text) ){
      return null;
    }else{
      return {invalidParte : true};
    }
  }
  static emailValidator(control) {
    // RFC 2822 compliant regex
    if ( control.value &&
      control.value.match(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      )
    ) {
      return null;
    } else {
      return { invalidEmailAddress: true };
    }
  }

  static passwordValidator(control) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return null;
    } else {
      return { invalidPassword: true };
    }
  }
  static rutValidator(control){
    var rut = control.value;
    if(rut && ValidationService.validarRut(rut)){
      return null;
    } else {
      return { invalidRut: true };
    }
  }
  static validarRut(rut){
    var valor = rut.replace('.','');
    valor = valor.replace('-','');
    var cuerpo = valor.slice(0,-1);
    var dv = valor.slice(-1).toUpperCase();
    rut = cuerpo + '-'+ dv
    if(cuerpo.length < 7) {return false;}

    var suma = 0;
    var multiplo = 2;
    for(var i=1;i<=cuerpo.length;i++) {
        var index = multiplo * valor.charAt(cuerpo.length - i);
        suma = suma + index;
        if(multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }
    }

    var dvEsperado = 11 - (suma % 11);
    dv = (dv == 'K')?10:dv;
    dv = (dv == 0)?11:dv;

    if(dvEsperado != dv) {
       return false;
     }
    return true;
  }
}