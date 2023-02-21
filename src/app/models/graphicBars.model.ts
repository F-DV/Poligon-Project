export interface UrlParameters { //Tipado para grafico de barras
  ticker:string;
  multiplier:number;
  timeSpan:string;
  dateFrom:string;
  dateTo:string;
  adjusted:string;
  sort:string;
  limit:string;
}

export interface ShowData {
  par:string;
  closePrice:string;
  openPrice:string;
  hPrice:string;
  lPrice:string;
  NTransactions:string;
  markTime:string;
  volume:string;
  averagePrice:string;
}
