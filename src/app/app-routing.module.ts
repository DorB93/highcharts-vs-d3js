import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChartDisplayComponent} from "./components/chart-display/chart-display.component";
import {D3Component} from "./components/d3/d3.component";
import {ForceLayoutComponent} from "./components/force-layout/force-layout.component";

const routes: Routes = [
  {path: '', component: ForceLayoutComponent},
  {path: 'highcharts', component: ChartDisplayComponent},
  {path: 'D3', component: D3Component},
  {path:'force', component:ForceLayoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
