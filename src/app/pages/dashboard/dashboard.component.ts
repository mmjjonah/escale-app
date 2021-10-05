import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  private chartCommandData = []
  private labelsCommand = []
  private chartCommand = null
  
  private chartGateauData = []
  private labelsGateau = []
  private chartGateau = null

  public fgFilterCommand: FormGroup
  public fgFilterGateau: FormGroup


  constructor(
    private command$: CommandService
  ) {}

  initFilterCommand() {
    this.fgFilterCommand = new FormGroup({
      command_date_du: new FormControl('', [Validators.required]),
      command_date_au: new FormControl('', [Validators.required]),
    })
    
    this.chartCommand = new Chart(document.getElementById("commandChart"), {
      type: 'line',
      hover: false,
      data: {
        labels: this.labelsCommand,
        datasets: [
          {
            data: this.chartCommandData,
            fill: false,
            borderColor: '#fbc658',
            backgroundColor: 'transparent',
            pointBorderColor: '#fbc658',
            pointRadius: 4,
            pointHoverRadius: 4,
            pointBorderWidth: 8,
          }
        ]
      },
      options: {
        legend: {
          display: false,
          position: 'top'
        }
      }
    });
  }
  
  initFilterGateau() {
    this.fgFilterGateau = new FormGroup({
      gateau_date_du: new FormControl('', [Validators.required]),
      gateau_date_au: new FormControl('', [Validators.required]),
    })
    
    this.chartGateau = new Chart(document.getElementById("gateauChart"), {
      type: 'line',
      hover: false,
      data: {
        labels: this.labelsGateau,
        datasets: [
          {
            data: this.chartGateauData,
            fill: false,
            borderColor: '#28a745',
            backgroundColor: 'transparent',
            pointBorderColor: '#28a745',
            pointRadius: 4,
            pointHoverRadius: 4,
            pointBorderWidth: 8,
          }
        ]
      },
      options: {
        legend: {
          display: false,
          position: 'top'
        }
      }
    });
  }
  
  onSubmitFilterGateau() {
    const params = {
      date_du: this.fgFilterGateau.value.gateau_date_du,
      date_au: this.fgFilterGateau.value.gateau_date_au
    }

    this.command$.chart(params).subscribe((res) => {
      this.chartGateauData = []
      this.labelsGateau = []

      res.data.map((d: {date: string, count: number}) => {
        this.chartGateauData = [...this.chartGateauData, d.count]
        this.labelsGateau = [...this.labelsGateau, formatDate(d.date, 'dd/MM/yyyy', 'fr') ]
      })

      this.chartGateau.data.labels = this.labelsGateau
      this.chartGateau.data.datasets[0].data = this.chartGateauData

      this.chartGateau.update()
    })
  }

  onSubmitFilterCommand() {
    const params = {
      date_du: this.fgFilterCommand.value.command_date_du,
      date_au: this.fgFilterCommand.value.command_date_au
    }

    this.command$.chart(params).subscribe((res) => {
      this.chartCommandData = []
      this.labelsCommand = []

      res.data.map((d: {date: string, count: number}) => {
        this.chartCommandData = [...this.chartCommandData, d.count]
        this.labelsCommand = [...this.labelsCommand, formatDate(d.date, 'dd/MM/yyyy', 'fr') ]
      })

      this.chartCommand.data.labels = this.labelsCommand
      this.chartCommand.data.datasets[0].data = this.chartCommandData

      this.chartCommand.update()
    })
  }

  async ngOnInit() {
    this.initFilterCommand();
    this.initFilterGateau();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
