import { Component, OnInit } from '@angular/core';

import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' }
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
  constructor() { }

  ngOnInit() {
  }

}
