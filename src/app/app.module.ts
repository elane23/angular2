import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { RateListComponent } from './rate-list/rate-list.component';
import { RateConverterComponent } from './rate-converter/rate-converter.component';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CurrencyExchangeService } from './currency-exchange.service';
import { AppRoutingModule } from './app-routing.module';
import {MomentModule} from 'angular2-moment/moment.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    RateListComponent,
    RateConverterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    Ng2TableModule,
    FormsModule,
    HttpModule,
    MomentModule,
    AppRoutingModule,
    PaginationModule.forRoot()
  ],
  providers: [CurrencyExchangeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
