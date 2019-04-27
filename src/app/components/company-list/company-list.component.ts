import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';

import { forkJoin } from 'rxjs';
import { ChartOptions, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import * as pluginAnnotations from 'chartjs-plugin-annotation';

import { CompanyService } from 'src/app/services/company.service';
import { Page } from 'src/app/models/page';
import { CompanyWithJobCount } from 'src/app/models/company-with-job-count';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {

  companiesPage: Page<CompanyWithJobCount>;

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
  public pieChartLabels: Label[] = ['Apple', 'Google', 'Facebook', 'Others'];
  public pieChartData: number[] = [300, 500, 100, 15];
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: [
        'rgba(219,56,17,1)',
        'rgba(254,153,0,1)',
        'rgba(69,132,237,1)',
        'rgba(56,142,60,1)',
        'rgba(244,143,177,1)',
        'rgba(255,112,67,1)',
        'rgba(244,67,54,1)',
        'rgba(121,85,72,1)',
        'rgba(79,195,247,1)',
        'rgba(255,235,59,1)'
      ],
    },
  ];

  // Line chart
  public lineChartData: ChartDataSets[] = [
    { data: [0, 12, 35, 50, 98, 101, 158], label: 'Tracked companies', datalabels: {display: false} }
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: (ChartOptions) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{
        gridLines: {
          color: 'rgba(240,240,240,1)',
          drawOnChartArea: true,
          display: true,
          drawTicks: false,
          drawBorder: false,
          borderDash: [12, 10]
        },
      }],
      yAxes: [
        {
          gridLines: {
            color: 'rgba(240,240,240,1)',
            drawOnChartArea: true,
            display: true,
            drawTicks: false,
            drawBorder: false,
          }
        }
      ]
    },
  };
  public lineChartPlugins = [pluginAnnotations];

  constructor(
    private companyService: CompanyService,
    @Inject(LOCALE_ID) public locale: string,
  ) {
    this.loadData(0);
    forkJoin(
      this.companyService.getHistory(),
      this.companyService.getMostActiveCompanies(10)
    ).subscribe(res => {
      // Construct cumulative companies count
      const list = res[0];
      const data = this.lineChartData[0].data as number[];
      data.length = 0;
      this.lineChartLabels.length = 0;

      let index = 0;
      for (const item of list) {
        data.push(index === 0 ? item.count : (item.count + data[index - 1]));
        this.lineChartLabels.push(formatDate(item.date, 'MMMM d, y', locale));
        index++;
      }

      // Construct pie chart for most active companies
      const mostActiveCompany = res[1];
      this.pieChartLabels.length = 0;
      this.pieChartData.length = 0;
      for (const item of mostActiveCompany) {
        this.pieChartLabels.push(item.name ? item.name : 'Not known');
        this.pieChartData.push(item.jobCount);
      }
    });
  }

  ngOnInit() {
  }

  loadData(page: number) {
    this.companyService.getCompanies(page).subscribe(res => this.companiesPage = res);
  }

}
