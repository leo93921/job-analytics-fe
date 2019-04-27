import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../models/page';
import { Company } from '../models/company';
import { CompanyWithJobCount } from '../models/company-with-job-count';
import { TrackingHistoryItem } from '../models/job-tracking-history-item';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private END_POINT = `http://localhost:8080/companies`;

  constructor(private http: HttpClient) { }

  public getCompanies(page: number): Observable<Page<CompanyWithJobCount>> {
    return this.http.get<Page<CompanyWithJobCount>>(`${this.END_POINT}`, {
      params: {
        page: page.toString()
      }
    });
  }

  public getCompanyById(id: string): Observable<Company> {
    return this.http.get<Company>(`${this.END_POINT}/${id}`);
  }

  public getHistory(): Observable<TrackingHistoryItem[]> {
    return this.http.get<TrackingHistoryItem[]>(`${this.END_POINT}/history`);
  }

  public getCount(): Observable<number> {
    return this.http.get<number>(`${this.END_POINT}/count`);
  }
}
