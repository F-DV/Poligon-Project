import { Injectable } from '@angular/core';
import {UrlParameters, ShowData } from '../models/graphicBars.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  //Objeto inicializado
  public urlParameters: UrlParameters = {
    ticker: 'BTCUSD',
      multiplier: 1,
      timeSpan: 'day',
      dateFrom:'2023-01-09',
      dateTo:'2023-01-09',
      adjusted:'adjusted=true',
      sort:'sort=asc',
      limit:'limit=5000'
  }

  //Objeto para los datos de graficacion
  show:ShowData = {
    par:'',
    closePrice:'',
    openPrice:'',
    hPrice:'',
    lPrice:'',
    NTransactions:'',
    markTime:'',
    volume:'',
    averagePrice:''
  }

  //Se crea un tipo observable para el objeto que contiene los argumentos para la Url
  private myBars$: Subject<UrlParameters>;  //1. Creamos el subject que cuando emita, emita un objeto de tipo UrlParameters

  //Creamos observable para actualizar los graficos
  private graphic$: Subject<ShowData>;        //1. Creamos el subject que cuando emita, emita un objeto de tipo ShowData

  constructor(){
    this.myBars$ = new Subject();           //2. inicializo el Subject mybars$
    this.graphic$ = new Subject();          //2. inicializo el Subject graphic$
  }

  //Metodo para acceder a los parametros de la url retornando un objervable del tipo UrlParameters
  getUrlParameters():Observable<UrlParameters>{
    return this.myBars$.asObservable();
  }

  //metodo para acceder a los datos de graficación, retornando un Observable del tipo ShowData
  getGraphicData():Observable<ShowData>{
    return this.graphic$.asObservable();
  }

  //Metodo para actualizar los parametros de la url
  updateUrlParameters(cripto: string,temporality: string){
    this.urlParameters.ticker = cripto;
    this.urlParameters.timeSpan = temporality;

    this.myBars$.next(this.urlParameters);    //3. Avisamos a los suscriptores que la url cambio
  }

  //Metodo para actualizar los datos de graficación
  updateGraphic(data:ShowData){
    this.show.par = data.par;
    this.show.closePrice = data.closePrice;
    this.show.openPrice= data.openPrice;
    this.show.hPrice = data.hPrice;
    this.show.lPrice = data.lPrice;
    this.show.NTransactions = data.NTransactions;
    this.show.markTime = data.markTime;
    this.show.volume = data.volume;
    this.show.averagePrice = data.averagePrice;

    this.graphic$.next(this.show);            //3. Avisamos a todos los componentes suscriptos que hubo un cambio en los datos para graficar
  }

}
