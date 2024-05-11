import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { GetDataService } from './services/get-data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgxChartsModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  cpuUsageData: any = [];
  errorRateData: any = [];

  view: [number, number] = [700, 400]

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabelCpu = 'Days';
  yAxisLabelCpu = 'CPU Usage (%)';
  xAxisLabelError = 'Days';
  yAxisLabelError = 'Errors';

  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#03ecfc', '#9003fc', '#fc0390', '#fcc603']
  };

  constructor(private dataService: GetDataService){}

  ngOnInit(): void {
    this.dataService.getCpuUsage().subscribe(response => {
      this.cpuUsageData = [{
        name: 'Microservice A',
        series: response.map(data => ({
          name: new Date(data.timestamp).toLocaleString(),
          value: data.usage
        })) ?? []
      },
      {
        name: 'Microservice B',
        series: response.map(data => ({
          name: new Date(data.timestamp).toLocaleString(),
          value: 1
        })) ?? []
      }
    ]
    })

    this.dataService.getErrorRate().subscribe(response => {
      this.errorRateData = response.map(data => ({
        name: new Date(data.timestamp).toLocaleString(),
        value: data.errors
      })) ?? []
    })
  }
}
