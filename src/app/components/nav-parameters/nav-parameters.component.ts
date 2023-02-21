import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-nav-parameters',
  templateUrl: './nav-parameters.component.html',
  styleUrls: ['./nav-parameters.component.scss']
})
export class NavParametersComponent {
  chooseTemporality: string[]= ['day','week','month'];
  choosecriptousd: string[] = ['BTCUSD','ADAUSD'];
  sendCripto: string | undefined | null = '';
  sendTemportality: string | undefined | null = '';

  formGroup = new FormGroup({
    cripto: new FormControl('BTCUSD'),
    temporality: new FormControl('day'),

  });

  constructor(
    private _apiService: ApiserviceService,
    private _store: StoreService
  ){}

  ngOnInit(){
    this._apiService.getBars(); //Realizamos peticion para mostar los valores por defecto en graphicComponent
  }

  //Metodo para enviar valores del formulario
  onSubmit(){

    this.sendCripto = this.formGroup.get('cripto')?.value
    this.sendTemportality = this.formGroup.get('temporality')?.value

    if(typeof this.sendCripto === 'string' && typeof this.sendTemportality === 'string'){

      this._store.updateUrlParameters(this.sendCripto,this.sendTemportality); //Cambio de parametros la url
      this._apiService.getBars();                                             //Hago una peticion a la url con los nuevos parametros.

    }else{
      window.alert('especifique lo que quiere ver');
    }
  }

  //metodo para resetear el formulario
  onReset(){
    this.formGroup.reset();
  }
}
