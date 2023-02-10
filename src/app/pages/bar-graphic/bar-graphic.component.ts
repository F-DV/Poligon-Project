import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/services/apiservice.service';

@Component({
  selector: 'app-bar-graphic',
  templateUrl: './bar-graphic.component.html',
  styleUrls: ['./bar-graphic.component.scss']
})
export class BarGraphicComponent implements OnInit{

  par = '';
  closePrice = '';
  openPrice = '';
  hPrice = '';
  lPrice ='';
  NTransactions = '';
  markTime = '';
  volume = '';
  averagePrice = '';

  constructor(private apiService: ApiserviceService){
  }

  ngOnInit(): void {
    this.apiService.getBars()
    .subscribe(data => {
      //console.log(res);
      this.par = data.ticker;
      this.closePrice = data.results[0].c;
      this.openPrice = data.results[0].o;
      this.hPrice = data.results[0].h;
      this.lPrice = data.results[0].l;
      this.NTransactions = data.results[0].n;
      this.markTime = data.results[0].t;
      this.volume = data.results[0].v;
      this.averagePrice = data.results[0].vw;
    },err =>{
      alert(err);
    })
  }



}


