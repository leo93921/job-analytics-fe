import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { formatDate } from '@angular/common';

import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { JobService } from 'src/app/services/job.service';
import { forkJoin } from 'rxjs';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public jobsCount: number;
  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Daily added jobs', datalabels: {display: false} }
  ];
  public lineChartCompanyData: ChartDataSets[] = [
    { data: [0, 12, 35, 50, 98, 101, 158], label: 'Daily added companies', datalabels: {display: false} }
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartCompanyLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: (ChartOptions) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{
        gridLines: {
          color: 'rgba(0,0,0,0)',
          drawOnChartArea: false,
          display: false,
          drawTicks: false,
          drawBorder: false,
          tickMarkLength: 0
        },
        ticks: {
          display: false
        }
      }],
      yAxes: [
        {
          gridLines: {
            color: 'rgba(0,0,0,0)',
            drawOnChartArea: false,
            display: false,
            drawTicks: false,
            drawBorder: false,
            tickMarkLength: 0
          },
          ticks: {
            display: false
          }
        }
      ]
    },
  };
  public lineChartColors: Color[] = [
    {
      backgroundColor: 'transparent',
      borderColor: 'rgba(255,255,255,0.3)',
      pointBackgroundColor: 'rgba(255,255,255,0.3)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];
  public lineChartPlugins = [pluginAnnotations];

  constructor(
    private jobService: JobService,
    @Inject(LOCALE_ID) public locale: string,
    private companyService: CompanyService
  ) {
    forkJoin(
      this.jobService.getHistory(),
      this.jobService.getCount(),
      this.companyService.getHistory()
    ).subscribe(res => {
      // Build job history
      const list = res[0];
      const jobData = this.lineChartData[0].data as number[];
      jobData.length = 0;
      this.lineChartLabels = [];
      for (const item of list) {
        jobData.push(item.count);
        this.lineChartLabels.push(formatDate(item.date, 'EEEE, MMMM d, y', locale));
      }
      // Get job count
      this.jobsCount = res[1];

      // Build company history
      const companies = res[2];
      const data = this.lineChartCompanyData[0].data as number[];
      data.length = 0;
      this.lineChartCompanyLabels = [];
      for (const item of companies) {
        data.push(item.count);
        this.lineChartCompanyLabels.push(formatDate(item.date, 'EEEE, MMMM d, y', locale));
      }
    });
  }

  ngOnInit() {
  }

}
