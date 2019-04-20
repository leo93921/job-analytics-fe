import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobListComponent } from './components/job-list/job-list.component';
import { HomeComponent } from './components/home/home.component';
import { ContainerComponent } from './components/layout/container/container.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { CompanyDetailComponent } from './components/company-detail/company-detail.component';
import { JobDetailComponent } from './components/job-detail/job-detail.component';


const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'job-list',
        component: JobListComponent
      },
      {
        path: 'job/:id',
        component: JobDetailComponent
      },
      {
        path: 'company-list',
        component: CompanyListComponent
      },
      {
        path: 'company/:id',
        component: CompanyDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
