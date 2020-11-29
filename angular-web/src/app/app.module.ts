import {HeaderInterceptor} from './interceptors/header.interceptor';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {Ng2TelInputModule} from 'ng2-tel-input';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import {AppRoutingModule, routeingComponents} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { SideNavComponent } from './private/side-nav/side-nav.component';
import { HeaderComponent } from './private/header/header.component';
import { BarChartComponent } from './private/bar-chart/bar-chart.component';
import { LineChartComponent } from './private/line-chart/line-chart.component';
import { PieChartComponent } from './private/pie-chart/pie-chart.component';
import { DataTableComponent } from './private/data-table/data-table.component';


@NgModule({
  declarations: [
    AppComponent,
    ...routeingComponents,
    SideNavComponent,
    HeaderComponent,
    BarChartComponent,
    LineChartComponent,
    PieChartComponent,
    DataTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2TelInputModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MDBBootstrapModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
