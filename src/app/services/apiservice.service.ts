import { HttpClient, HttpErrorResponse, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError} from 'rxjs';
import { containtUrl } from '../utils/containtUrl';
import {ShowData} from '../models/graphicBars.model';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService{

  private graphicData:ShowData = {
    par: '',
    closePrice: '',
    openPrice:'',
    hPrice:'',
    lPrice:'',
    NTransactions:'',
    markTime:'',
    volume:'',
    averagePrice:'',
  };
  private apiURL:string;

  constructor(
    private http: HttpClient,
    private _store:StoreService
  ) {
    this.apiURL = `${containtUrl.urlBarras}/ticker/X:${_store.urlParameters.ticker}/range/${_store.urlParameters.multiplier}/${_store.urlParameters.timeSpan}/${_store.urlParameters.dateFrom}/${_store.urlParameters.dateTo}?$storeData.adjusted}&${_store.urlParameters.sort}&${_store.urlParameters.limit}`;
  }

  getBars(){

    //Traemos los parametros de la URL que tiene Store
    this._store.getUrlParameters().subscribe(storeData => {
      this.apiURL = `${containtUrl.urlBarras}/ticker/X:${storeData.ticker}/range/${storeData.multiplier}/${storeData.timeSpan}/${storeData.dateFrom}/${storeData.dateTo}?$storeData.adjusted}&${storeData.sort}&${storeData.limit}`;
    })

    //Peticion URL, con pipe para atrapar la respuesta de la api y manejo de errores
    this.http.get<any>(this.apiURL,this.getHttpHeaders())
    .pipe(
      catchError((err: HttpErrorResponse)=>{
        return this.handleErrors(err);
      })
    ).subscribe(data => {
      this.graphicData.par = data.ticker;
      this.graphicData.closePrice = data.results[0].c;
      this.graphicData.openPrice = data.results[0].o;
      this.graphicData.hPrice = data.results[0].h;
      this.graphicData.lPrice = data.results[0].l;
      this.graphicData.NTransactions = data.results[0].n;
      this.graphicData.markTime = data.results[0].t;
      this.graphicData.volume = data.results[0].v;
      this.graphicData.averagePrice = data.results[0].vw;

      this._store.updateGraphic(this.graphicData); //Enviando los nuevos datos de graficacion al store
    },err =>{
      console.log(err);
      alert(err);
    })
  }

  //Manejo de algunos errores
  handleErrors(error: HttpErrorResponse){
    if(error.status == HttpStatusCode.Forbidden){
      return throwError('No tiene permisos para realizar la solicitud');
    }else if(error.status == HttpStatusCode.NotFound){
      return throwError('url no encontrada');
    }else if(error.status == HttpStatusCode.InternalServerError){
      return throwError('Error en el servidor');
    }else{
      return throwError('Un error inesperado ha ocurrido');
    }
  }

  //Encabezado para la peticion Http con el token de acceso
  getHttpHeaders(){
    const token = containtUrl.apiKey;
    return{
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    }
  }

}
