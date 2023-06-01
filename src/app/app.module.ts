import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ChartDisplayComponent} from './components/chart-display/chart-display.component';
import {HighchartsChartModule} from 'highcharts-angular';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {D3Component} from './components/d3/d3.component';
import { ForceLayoutComponent } from './components/force-layout/force-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartDisplayComponent,
    NavBarComponent,
    D3Component,
    ForceLayoutComponent,
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
