import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';

@Component({
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent implements OnInit {
  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // })

  public myForm: FormGroup = this.fb.group({
    name: [ '', [Validators.required, Validators.minLength(3)] ],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]]
  });

  public product ={
    name: 'Iphone 15 pro',
    price: 24000,
    inStorage: 10
  }

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService
  ) { }

  ngOnInit(): void {
    this.myForm.reset( this.product );
  }

  isInvalidField( field: string ) : boolean | null {
    return this.validatorsService.isInvalidField( this.myForm, field );
  }

  getFieldError( field: string ): string {
    return this.validatorsService.getFieldError( this.myForm, field );
  }

  onSave() : void {
    if( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    this.myForm.reset({price: 0, inStorage: 0});
  }
}
