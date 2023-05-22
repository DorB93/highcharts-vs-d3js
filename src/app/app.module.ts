import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ChartDisplayComponent} from './components/chart-display/chart-display.component';
import {HighchartsChartModule} from 'highcharts-angular';
import {NodesDisplayComponent} from './components/nodes-display/nodes-display.component';
import {HomePageComponent} from './views/home-page/home-page.component';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {D3Component} from './components/d3/d3.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartDisplayComponent,
    NodesDisplayComponent,
    HomePageComponent,
    NavBarComponent,
    D3Component,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HighchartsChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
