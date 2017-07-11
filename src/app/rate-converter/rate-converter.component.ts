import { Component, OnInit } from '@angular/core';
import { CurrencyExchangeService } from '../currency-exchange.service';
import { Currency, RateClass } from '../currency.model';
import {ActivatedRoute} from '@angular/router';
import * as moment from "moment";

@Component({
  selector: 'app-rate-converter',
  templateUrl: './rate-converter.component.html',
  styleUrls: ['./rate-converter.component.less']
})
export class RateConverterComponent implements OnInit {
  public currency: Currency;
  public inversed:Currency;
  public rate: RateClass;
  public baseName: string = "USD";
  public updateBaseName: string;
  public targetName: string = "EUR";
  public updateTargetName: string;
  public currencyList = [];
  public num: number = 1;
  public historical: Array<{ date: string, rate: number }> = [];
  public temp: Array<{ date: string, rate: number }> = [];
  public now:string = moment().format('MMMM Do YYYY, h:mm:ss a');

  constructor(private currencyExchangeService: CurrencyExchangeService,public route:ActivatedRoute) { }

  ngOnInit() {
    this.updateBaseName = this.baseName;
    this.updateTargetName = this.targetName;
    this.convertRate(this.baseName, this.targetName);
    if (!localStorage.getItem("allCurrency")) {
     this.currencyExchangeService.getRate().then(currency => {
       let temp = [];
       Object.keys(currency.data).forEach(element => {
         temp.push({
           title: element,
           name: element
         })
       });
       temp.unshift({
         title: currency.base,
         name: currency.base
       });
       temp.sort(function (a, b) {
         if (a.title < b.title) return -1;
         else return 1;
       });
       //save the currency list to local storage and use it to show options in select list.
       if (!localStorage.getItem("allCurrency")) {
         localStorage.setItem("allCurrency", JSON.stringify(temp));
       }
     });
   }

    this.currencyList = JSON.parse(localStorage.getItem("allCurrency")).map(elem => elem.title);

  }
 /*
  * calculate the rate from base currency to target currency.
  */
  public convertRate(baseName: string, targetName: string): void {
    this.updateBaseName = baseName;
    this.updateTargetName = targetName;
    this.currencyExchangeService.currencyConverter(this.updateBaseName, this.updateTargetName).then(currency => {
      this.currency = currency;
      let curr_moment = moment();
      this.historical = [];
      this.temp = [];
      this.getHistoricalData(baseName,targetName, curr_moment.subtract(0, 'days').format("YYYY-MM-DD"));
      for (let i = 0; i < 10; i++) {
        this.getHistoricalData(baseName, targetName, curr_moment.subtract(1, 'days').format("YYYY-MM-DD"));
      }
      this.historical = this.temp;
    })
  }
 /*
  * get the exchange rate of base currency and target currency on a specific date.
  */
  public getHistoricalData(baseName: string, targetName: string, date: string): void {
    this.currencyExchangeService.getHistoricalData(baseName, targetName, date).then(data => {
      this.temp.push({ date: date, rate: data.rate[0].rate.valueOf() });
    })
  }

}
