import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { CompanyService } from 'src/app/services/company.service';
import { Page } from 'src/app/models/page';
import { Company } from 'src/app/models/company';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {

  companiesPage: Page<Company>;

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
      backgroundColor: ['rgba(219,56,17,1)', 'rgba(254,153,0,1)', 'rgba(69,132,237,1)'],
    },
  ];

  // Line chart
  public lineChartData: ChartDataSets[] = [
    { data: [0, 12, 35, 50, 98, 101, 158], label: 'Series A', datalabels: {display: false} }
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
    private companyService: CompanyService
  ) {
    this.loadData(0);
  }

  ngOnInit() {
  }

  loadData(page: number) {
    this.companyService.getJobs(page).subscribe(res => this.companiesPage = res);
  }

}
