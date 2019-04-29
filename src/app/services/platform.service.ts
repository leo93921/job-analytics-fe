import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HiredJob } from '../models/hired-job';
import { Observable } from 'rxjs';
import { JobsPerPlatform } from '../models/JobsPerPlatform';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  private END_POINT = `http://localhost:8080/platform`;

  constructor(private http: HttpClient) { }


  public getHiredJobsByPlatform(): Observable<Array<HiredJob>>{
    return this.http.get<Array<HiredJob>>(this.END_POINT + "/findHiredJobs");
  }
  
  public getJobsPerPlatform(): Observable<Array<JobsPerPlatform>> {
    return this.http.get<Array<JobsPerPlatform>>(this.END_POINT + "/findJobsPerPlatform");
  }

}
