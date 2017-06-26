import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Currency, RateClass } from './currency.model';

@Injectable()
export class CurrencyExchangeService {
	private url = "http://api.fixer.io/latest";

	private handleError(error: any): Promise<any> {
		console.log("error occured", error);
		return Promise.reject(error.message || error);
	}
   /*
	* get the latest rate list based on EUR.
	*/
	getRate(): Promise<Currency> {
		return this.http.get(this.url)
				.toPromise()
				.then(response => this.converter(response.json()))
				.catch(this.handleError);
	}
   /*
	* get a rate list based on specific currency.
	*/	
	getSelectedRate(cur: string) : Promise<Currency> {
		const url1 = "http://api.fixer.io/latest?base=" + cur;
		return this.http.get(url1)
				.toPromise()
				.then(response => this.converter(response.json()))
				.catch(this.handleError);
	}
   /*
	* convert the data into Currency model.
	*/
	converter(data: any): Currency {
		let res: Currency = new Currency();
		res.base = data.base;
		res.date = data.date;
		res.rate = [];
		res.data = data.rates;
		// console.log(data.rates);
		for (let rates in data.rates) {
			let tmp = new RateClass();
			tmp.currencyName = rates;
			tmp.rate = data.rates[rates];
			res.rate.push(tmp);
		}
		return res;
	}
   /*
    * return a Currency format Promise containing base, target, date and rate information.
    */
	currencyConverter(baseName:string, targetName:string):Promise<Currency> {
		const url = "http://api.fixer.io/latest?base=" + baseName + "&symbols=" + targetName;
		return this.http.get(url)
				.toPromise()
				.then(response => this.converter(response.json()))
				.catch(this.handleError);
	}
   /*
    * return a Currency format Promise containing date and rate information.
    */
	getHistoricalData(baseName:string, targetName:string, date:string):Promise<Currency> {
		const url = "http://api.fixer.io/"+ date + "?base=" + baseName + "&symbols=" + targetName;
		return this.http.get(url)
				.toPromise()
				.then(response => this.converter(response.json()))
				.catch(this.handleError);		
	}

	constructor(private http: Http) { }

}
