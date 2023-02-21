import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.scss']
})
export class TestComponentComponent {

  apellido: string | undefined | null;

  constructor(private fb: FormBuilder){
    this.apellido = '';
  }

  //Para obtener un solo valor de formulario
  name = new FormControl('');

  // creamos modelo de grupo de formulario
  profile = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  })

  //Modelo de formulario utilizando formBuilder
  profileForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['']
    }),
  });

  updateName(){
    this.name.setValue('Nancy');
  }

  //metodo para el grupo de formulario
  onSubmit(){
    //TODO: usar EventEmitter con el valor de formulario
    this.apellido = this.profile.get('lastName')?.value;
    console.warn(this.apellido);
  }
}
