import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from '../_services/validation.service';

@Component({
  selector: 'control-messages',
  template: `
    <div *ngIf="errorMessage !== null">{{errorMessage}}</div>`
})
export class ControlMessageComponent  {

  //errorMessage: string;
  @Input() control: FormControl;
  constructor() {}

  get errorMessage() {
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) ) {
        return ValidationService.getValidatorErrorMessage(
          propertyName,
          this.control.errors[propertyName]
        );
      }
    }
    return null;
  }
}
