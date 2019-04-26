import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Page } from '../models/page';
import { Observable } from 'rxjs';
import { Job } from '../models/job';
import { JobTrackingHistoryItem } from '../models/job-tracking-history-item';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private END_POINT = `http://localhost:8080/jobs`;

  constructor(private http: HttpClient) { }

  public getJobs(page: number): Observable<Page<Job>> {
    return this.http.get<Page<Job>>(`${this.END_POINT}`, {
      params: {
        page: page.toString()
      }
    });
  }

  public getJob(id: string): Observable<Job> {
    return this.http.get<Job>(`${this.END_POINT}/${id}`);
  }

  public getJobsForCompany(companyID: string, page: number): Observable<Page<Job>> {
    return this.http.get<Page<Job>>(`${this.END_POINT}/from-company/${companyID}`, {
      params: {
        page: page.toString()
      }
    });
  }

  public getHistory(): Observable<JobTrackingHistoryItem[]> {
    return this.http.get<JobTrackingHistoryItem[]>(
      `${this.END_POINT}/history`
    );
  }

  public getCount(): Observable<number> {
    return this.http.get<number>(`${this.END_POINT}/count`);
  }
}
