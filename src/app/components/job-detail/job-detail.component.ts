import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobService } from 'src/app/services/job.service';
import { Job } from 'src/app/models/job';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {

  job: Job;

  constructor(
    private activatedRoute: ActivatedRoute,
    private jobService: JobService
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.jobService.getJob(params.id).subscribe((res: any) => {
        this.job = res;
        console.log(res);
      });
    });
  }

  ngOnInit() {
  }

}
