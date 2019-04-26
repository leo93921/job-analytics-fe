import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { formatDate } from '@angular/common';

import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Daily added jobs', datalabels: {display: false} }
  ];
  public lineChartData2: ChartDataSets[] = [
    { data: [0, 12, 35, 50, 98, 101, 158], label: 'Series A', datalabels: {display: false} }
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
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
    @Inject(LOCALE_ID) public locale: string
  ) {
    this.jobService.getHistory().subscribe(list => {
      this.lineChartData[0].data.length = 0;
      this.lineChartLabels = [];
      for (const item of list) {
        this.lineChartData[0].data.push(item.count);
        this.lineChartLabels.push(formatDate(item.date, 'EEEE, MMMM d, y', locale));
      }

    });
  }

  ngOnInit() {
  }

}
