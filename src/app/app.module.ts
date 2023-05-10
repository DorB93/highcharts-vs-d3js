import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartDisplayComponent } from './components/chart-display/chart-display.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { NodesDisplayComponent } from './components/nodes-display/nodes-display.component';
import { D3NetworkGraphComponent } from './components/d3-network-graph/d3-network-graph.component';
import { HomePageComponent } from './views/home-page/home-page.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartDisplayComponent,
    NodesDisplayComponent,
    D3NetworkGraphComponent,
    HomePageComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HighchartsChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
