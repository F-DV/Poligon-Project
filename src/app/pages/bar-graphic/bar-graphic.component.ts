import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';

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

  constructor(
    private _store:StoreService
    ){
  }

  ngOnInit(): void {
    this._store.getGraphicData().subscribe(data => {
      this.par = data.par;
      this.closePrice = data.closePrice;
      this.openPrice = data.openPrice;
      this.hPrice = data.hPrice;
      this.lPrice = data.lPrice;
      this.NTransactions = data.NTransactions;
      this.markTime = data.markTime;
      this.volume = data.volume ;
      this.averagePrice = data.averagePrice;
    })
}

}


