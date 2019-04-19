import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
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
  public pieChartLabels: Label[] = ['Linkedin', 'Glassdoor', 'Monster'];
  public pieChartData: number[] = [300, 500, 100];
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
  public barChartLabels: Label[] = ['2018', '2019'];
  public barChartPlugins = [pluginDataLabels];
  public barChartData: ChartDataSets[] = [{
      data: [65, 59, 80, 81, 56, 55, 40],
      label: 'LinkedIn',
      backgroundColor: 'rgba(219,56,17,1)',
      hoverBackgroundColor: 'rgba(219,56,17,0.8)'
    },
    {
      data: [28, 48, 40, 19, 86, 27, 90],
      label: 'Glassdoor',
      backgroundColor: 'rgba(254,153,0,1)',
      hoverBackgroundColor: 'rgba(254,153,0,0.8)'
    },
    {
      data: [13, 56, 76, 123, 43, 54, 12],
      label: 'Monster',
      backgroundColor: 'rgba(69,132,237,1)',
      hoverBackgroundColor: 'rgba(69,132,237,0.8)'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
