import { HttpClient, HttpErrorResponse, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError} from 'rxjs';
import { containtUrl } from '../utils/containtUrl';
import {AggregatesBar} from '../models/graphicBars.model';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  private bar: AggregatesBar = {
    ticker: 'BTCUSD',
    multiplier: 1,
    timeSpan: 'day',
    dateFrom:'2023-01-09',
    dateTo:'2023-01-09',
    adjusted:'adjusted=true',
    sort:'sort=asc',
    limit:'limit=5000'
  }

  private apiURL = `${containtUrl.urlBarras}/ticker/X:${this.bar.ticker}/range/${this.bar.multiplier}/${this.bar.timeSpan}/${this.bar.dateFrom}/${this.bar.dateTo}?${this.bar.adjusted}&${this.bar.sort}&${this.bar.limit}`;

  constructor(
    private http: HttpClient
  ) {}

  getBars(): Observable<any>{

    return this.http.get<any>(this.apiURL,this.getHttpHeaders())
    .pipe(
      catchError((err: HttpErrorResponse)=>{
        return this.handleErrors(err);
      })
    )
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

  //Encabezados
  getHttpHeaders(){
    const token = containtUrl.apiKey;
    return{
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    }
  }

}
