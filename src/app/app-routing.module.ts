import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobListComponent } from './components/job-list/job-list.component';
import { HomeComponent } from './components/home/home.component';
import { ContainerComponent } from './components/layout/container/container.component';


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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
