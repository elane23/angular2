import { Component, OnInit } from '@angular/core';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { CurrencyExchangeService } from '../currency-exchange.service';
import { Currency, RateClass } from '../currency.model';

@Component({
  selector: 'app-rate-list',
  templateUrl: './rate-list.component.html',
  styleUrls: ['./rate-list.component.less']
})


export class RateListComponent implements OnInit {
  public currency: Currency;
  public rate: RateClass[];

  public rows:Array<any> = [];
  public columns:Array<any> = [];
  public page:number = 1;
  public itemsPerPage:number = 10;
  public maxSize:number = 5;
  public numPages:number = 1;
  public length:number = 0;

  public config:any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered']
  };

  private data:Array<any> = [];
  private tempData:Array<any> = [];

  public constructor(private currencyExchangeService: CurrencyExchangeService ) {
    this.length = this.data.length;
  }

  public ngOnInit():void {
    this.getCurrency();
  }
 /*
  * insert commonly used currencies to the table.
  */
  public getCurrency(): void {
    this.getSelectedBaseData("EUR");
    this.getSelectedBaseData("USD");
    this.getSelectedBaseData("CNY");
    this.getSelectedBaseData("GBP");
    this.getSelectedBaseData("INR");
    this.getSelectedBaseData("AUD");
    this.getSelectedBaseData("JPY");
    this.getSelectedBaseData("ZAR");
    this.getSelectedBaseData("CAD");
    this.data = this.tempData;
  }
 /*
  * get exchange currency rates based on a specific currency.
  */
  public getSelectedBaseData(baseName:string):void {
      this.currencyExchangeService.getSelectedRate(baseName).then(currency => {
      this.currency = currency;
      this.currency.data[(<any>this.currency.base)]=1;
      this.tempData.push(this.currency.data);
      let temp = [];
      Object.keys(this.currency.data).forEach(element => {
        temp.push({
          title: element,
          name: element
        })
      });
      temp.unshift({
        title:this.currency.base,
        name:this.currency.base
      });
      temp.sort(function(a, b){
        if(a.title < b.title) return -1;
        else return 1;
      });
      //save the currency list to local storage and use it to show options in select list.
      if(!localStorage.getItem("allCurrency")) {
        localStorage.setItem("allCurrency", JSON.stringify(temp));
      }
      temp.unshift({
        title: "",
        name:"base"
      });
      this.currency.data["base"]="1 " + this.currency.base;
      this.columns = temp.slice(0, 8);
      this.onChangeTable(this.config);
    });
  }

  public changePage(page:any, data:Array<any> = this.data):Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data:any, config:any):any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName:string = void 0;
    let sort:string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous:any, current:any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data:any, config:any):any {
    let filteredData:Array<any> = data;
    this.columns.forEach((column:any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item:any) => {
          return item[column.name].match(column.filtering.filterString);
        });
      }
    });
    config.filtering.filterString = config.filtering.filterString.toUpperCase();

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item:any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    let tempArray:Array<any> = [];
    filteredData.forEach((item:any) => {
      let flag = false;
      this.columns.forEach((column:any) => {
        if (item[column.name].toString().match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }

  public onCellClick(data: any): any {
    console.log(data);
  }
}
