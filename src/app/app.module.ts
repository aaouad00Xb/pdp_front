import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxEchartsModule } from 'ngx-echarts';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarComponent } from './charts/bar/bar.component';
import { Evolution2Component } from './charts/evolution2/evolution2.component';
import { EvolutionComponent } from './charts/evolution/evolution.component';
import { Pie2Component } from './charts/pie2/pie2.component';
import { PieComponent } from './charts/pie/pie.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Bar2Component } from './charts/bar2/bar2.component';
import { EditerComponent } from './editer/editer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyCommunePipe } from './my-commune.pipe';
import { LoginComponent } from './login/login.component';
import { BarrComponent } from './charts/barr/barr.component';

@NgModule({
  declarations: [
    AppComponent,
    BarComponent,
    Bar2Component,
    Evolution2Component,
    EvolutionComponent,
    LoginComponent,
    Pie2Component,
    PieComponent,
    EditerComponent,
    DashboardComponent,
    MyCommunePipe,
    BarrComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
 
    BrowserModule,
    AppRoutingModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
