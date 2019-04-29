import { Component, OnInit, ApplicationRef, ChangeDetectorRef } from '@angular/core';
import { ChartOptions, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { JobService } from 'src/app/services/job.service';
import { Page } from 'src/app/models/page';
import { Job } from 'src/app/models/job';
import { PlatformService } from 'src/app/services/platform.service';
import { HiredJob } from 'src/app/models/hired-job';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

  jobsPage: Page<Job>;

  linkedinPositions = [0, 0, 0, 0];
  monsterPositions = [0, 0, 0, 0];
  glassdoorPositions = [0, 0, 0, 0];

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top'
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
        color: 'white'
      },
    }
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(219,56,17,1)', 'rgba(254,153,0,1)', 'rgba(69,132,237,1)'],
    },
  ];

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['1-7',  '8-14', '15-29', '30+'];
  public barChartPlugins = [pluginDataLabels];
  public barChartData: ChartDataSets[] = [{
      data: [],
      label: 'LinkedIn',
      backgroundColor: 'rgba(219,56,17,1)',
      hoverBackgroundColor: 'rgba(219,56,17,0.8)'
    },
    {
      data: [],
      label: 'Glassdoor',
      backgroundColor: 'rgba(254,153,0,1)',
      hoverBackgroundColor: 'rgba(254,153,0,0.8)'
    },
    {
      data: [],
      label: 'Monster',
      backgroundColor: 'rgba(69,132,237,1)',
      hoverBackgroundColor: 'rgba(69,132,237,0.8)'
    }
  ];

  constructor(
    private jobService: JobService,
    private platformService: PlatformService,
    private ref: ApplicationRef,
    private changeRef: ChangeDetectorRef
  ) {
    this.loadData(0);

    forkJoin(
      this.platformService.getHiredJobsByPlatform(),
      this.platformService.getJobsPerPlatform()
      ).subscribe( res =>{
        const hiredJobs = res[0];
        const jobsPlat = res[1];

        hiredJobs.forEach(dat => {
                   
          switch(dat.days){
            case "1-7":
              this.getPlatformNumber(dat.platformName, dat.hiredJobs, 0);
              break;
            case "8-14":
              this.getPlatformNumber(dat.platformName, dat.hiredJobs, 1);
              break;
            case "15-29":            
              this.getPlatformNumber(dat.platformName, dat.hiredJobs, 2);
              break;
            case "30+":
              this.getPlatformNumber(dat.platformName, dat.hiredJobs, 3);
              break;
          }

          const setUp1 = this.linkedinPositions;
          const setUp2 = this.glassdoorPositions;
          const setUp3 = this.monsterPositions;
          
          this.barChartData[0].data = setUp1;
          this.barChartData[1].data = setUp2;
          this.barChartData[2].data = setUp3;

        });

        jobsPlat.forEach(dat => {
          this.pieChartLabels.push(dat.platformName);
          this.pieChartData.push(dat.jobsFound);
        });
    });
    
  }

  ngOnInit() {
  }

  public loadData(pageNumber: number) {
    this.jobService.getJobs(pageNumber).subscribe(res => {
      this.jobsPage = res;
    });
  }

  private getPlatformNumber(name: string, value: number, position: number){
    switch(name){
      case "Linkedin":
        this.linkedinPositions[position] = value;
        break;
        
      case "Glassdoor":
        this.glassdoorPositions[position] = value;
        break;

      case "Monster":
        this.monsterPositions[position] = value;
        break; 
    }
  }

}
