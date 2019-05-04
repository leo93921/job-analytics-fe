import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobListComponent } from './components/job-list/job-list.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { ContainerComponent } from './components/layout/container/container.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { CompanyDetailComponent } from './components/company-detail/company-detail.component';
import { JobDetailComponent } from './components/job-detail/job-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    JobListComponent,
    HomeComponent,
    NavbarComponent,
    ContainerComponent,
    CompanyListComponent,
    CompanyDetailComponent,
    JobDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
