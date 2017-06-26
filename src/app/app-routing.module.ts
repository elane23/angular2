import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RateListComponent } from './rate-list/rate-list.component';
import {RateConverterComponent} from './rate-converter/rate-converter.component';
import {HomeComponent} from './home/home.component';
const appRoutes: Routes = [
  { path: '',  component: HomeComponent },
  { path: 'converter', component: RateConverterComponent},
  { path: 'rates', component: RateListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}