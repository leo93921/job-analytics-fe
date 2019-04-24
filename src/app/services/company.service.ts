import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../models/page';
import { Company } from '../models/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private END_POINT = `http://localhost:8080/companies`;

  constructor(private http: HttpClient) { }

  public getCompanies(page: number): Observable<Page<Company>> {
    return this.http.get<Page<Company>>(`${this.END_POINT}`, {
      params: {
        page: page.toString()
      }
    });
  }

  public getCompanyById(id: string): Observable<Company> {
    return this.http.get<Company>(`${this.END_POINT}/${id}`);
  }
}
