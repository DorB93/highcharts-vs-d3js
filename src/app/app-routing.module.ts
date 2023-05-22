import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from "./views/home-page/home-page.component";
import {ChartDisplayComponent} from "./components/chart-display/chart-display.component";
import {D3Component} from "./components/d3/d3.component";

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'highcharts', component: ChartDisplayComponent},
  {path: 'D3', component: D3Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
