import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from 'src/app/models/company';
import { CompanyService } from 'src/app/services/company.service';
import { JobService } from 'src/app/services/job.service';
import { Page } from 'src/app/models/page';
import { Job } from 'src/app/models/job';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {

  company: Company;
  jobsPage: Page<Job>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService,
    private jobService: JobService
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.companyService.getCompanyById(params.id).subscribe(c => {
        this.company = c;
        this.loadJobs(0);
      });
    });
  }

  ngOnInit() {
  }

  loadJobs(page: number) {
    this.jobService.getJobsForCompany(this.company.id, page).subscribe(res => {
      this.jobsPage = res;
    });
  }

}
