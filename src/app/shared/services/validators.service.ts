import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class ValidatorsService {
  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  public cantBeStrider = (control: FormControl) => {
    const value = control.value.trim().toLowerCase();
    if(value === 'strider'){
      return {
        notStraider: true
      }
    }

    return null;
  }

  public isInvalidField(form: FormGroup, field: string) : boolean | null {
    return form.controls[field].errors && form.controls[field].touched;
  }

  public getFieldError(form: FormGroup, field: string): string {
    if(!form.controls[field]){
      return '';
    }
    const errors = form.controls[field].errors || { };
    for (const key of Object.keys(errors)) {
      switch(key){
        case 'required':
          return "Este campo es requerido";
        case 'minlength':
          return `Este campo requiere mínimo ${errors['minlength'].requiredLength} caracteres`
      }
    }
    return '';
  }

  public isEqualFieldOneToFieldTwo( field1: string, field2: string ) {
    return ( formGroup: AbstractControl ): ValidationErrors | null => {
      const fieldValue1 = formGroup.get( field1 )?.value;
      const fieldValue2 = formGroup.get( field2 )?.value;

      if( fieldValue1 !== fieldValue2 ) {
        formGroup.get( field2 )?.setErrors({ notEqual: true });
        return { notEqual: true }
      }
      formGroup.get( field2 )?.setErrors(null);
      return null;
    }
  }
}
