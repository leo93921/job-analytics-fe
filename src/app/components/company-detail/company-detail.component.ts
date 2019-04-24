import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from 'src/app/models/company';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {

  company: Company;

  constructor(
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.companyService.getCompanyById(params.id).subscribe(c => {
        this.company = c;
      });
    });
  }

  ngOnInit() {
  }

}
