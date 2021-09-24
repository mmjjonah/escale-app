import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommandService } from 'app/layouts/admin-layout/services/command/command.service';
import Chart from 'chart.js';
import { Subscription } from 'rxjs';


@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit, OnDestroy{
  private subscription = new Subscription();
  public canvas : any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartHours;
  public commandDashboard
  private chartCommand = []

  constructor(
    private command$: CommandService
  ) {}

  async ngOnInit() {
    this.chartColor = "#FFFFFF";

    const resDashboard = await this.command$.dashboard().toPromise()

    for (const [key, count] of Object.entries(resDashboard.data.command)) {
      this.chartCommand = [...this.chartCommand, count]
    }

    let dataCommand = {}

    let speedCanvas = document.getElementById("speedChart");

    dataCommand = {
      data: this.chartCommand,
      fill: false,
      borderColor: '#fbc658',
      backgroundColor: 'transparent',
      pointBorderColor: '#fbc658',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8,
    };

    let dataClient = {
      data: [0, 5, 10, 12, 20, 27, 30],
      fill: false,
      borderColor: '#51CACF',
      backgroundColor: 'transparent',
      pointBorderColor: '#51CACF',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8
    };

    let dataGateau = {
      data: [8, 2, 10, 6, 12, 22, 2],
      fill: false,
      borderColor: '#fbc658',
      backgroundColor: 'transparent',
      pointBorderColor: '#fbc658',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8
    };
    
    let dataMontant = {
      data: [5, 5, 15, 0, 24, 12, 15],
      fill: false,
      borderColor: '#6bd098',
      backgroundColor: 'transparent',
      pointBorderColor: '#6bd098',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8
    };

    let speedData = {
      labels: ["Lundi", "Mardi", "mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
      datasets: [dataCommand, dataClient, dataMontant]
    };

    let chartOptions = {
      legend: {
        display: false,
        position: 'top'
      }
    };

    let lineChart = new Chart(speedCanvas, {
      type: 'line',
      hover: false,
      data: speedData,
      options: chartOptions
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
