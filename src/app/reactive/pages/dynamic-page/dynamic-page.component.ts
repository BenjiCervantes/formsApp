import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {
  public myForm: FormGroup = this.fb.group({
    name: [ '', [ Validators.required, Validators.minLength( 3 ) ] ],
    favoriteGames: this.fb.array([
      [ 'Zelda TOTK', Validators.required ],
      [ 'GTA V', Validators.required ]
    ]),
  })

  public newFavorite: FormControl = new FormControl( '', Validators.required );

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService
  ) { }

  get favoriteGames(): FormArray {
    return this.myForm.controls['favoriteGames'] as FormArray;
  }

  isInvalidField( field: string ) : boolean | null {
    return this.validatorsService.isInvalidField( this.myForm, field );
  }

  isInvalidFieldInArray( formArray: FormArray, index: number ): boolean | null {
    return formArray.controls[index].errors && formArray.controls[index].touched;
  }

  getFieldError( field: string ): string {
    return this.validatorsService.getFieldError( this.myForm, field );
  }

  onDeleteFavorite( index: number ): void {
    this.favoriteGames.removeAt(index);
  }

  onAddToFavorites(): void {
    if( this.newFavorite.invalid ){
      return;
    }
    const newGame = this.newFavorite.value;
    this.favoriteGames.push(
      this.fb.control( newGame, Validators.required )
    )
    this.newFavorite.reset();
  }

  onSubmit(): void {
    if( this.myForm.invalid ){
      this.myForm.markAllAsTouched();
      return;
    }
    ( this.myForm.controls['favoriteGames'] as FormArray ) = this.fb.array([]);
    this.myForm.reset();
  }
}
