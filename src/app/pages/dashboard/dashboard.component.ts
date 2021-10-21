import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommandService } from 'app/layouts/admin-layout/services/command/command.service';
import Chart from 'chart.js';
import { Subscription } from 'rxjs';
import {StatusCodes} from 'http-status-codes';

@Component({
  // tslint:disable-next-line:component-selector
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  public dayData: {
    commandDay?: string | number,
    gateauDay?: string | number,
    clientDay?: string | number,
    montantDay?: string | number,
  } = {};

  private chartCommandData = []
  private chartGateauData = []
  private chartClientData = []
  private chartPaiementData = []

  private labelsCommand = []
  private labelsGateau = []
  private labelsClient = []
  private labelsPaiement = []

  private chartCommand = null
  private chartClient = null
  private chartGateau = null
  private chartPaiement = null

  public fgFilterCommand: FormGroup
  public fgFilterGateau: FormGroup
  public fgFilterClient: FormGroup
  public fgFilterPaiement: FormGroup


  constructor(
    private command$: CommandService
  ) {}

  initFilterCommand() {
    this.fgFilterCommand = new FormGroup({
      command_date_du: new FormControl('', [Validators.required]),
      command_date_au: new FormControl('', [Validators.required]),
    })

    this.chartCommand = new Chart(document.getElementById('commandChart'), {
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

    this.chartGateau = new Chart(document.getElementById('gateauChart'), {
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

  initFilterClient() {
    this.fgFilterClient = new FormGroup({
      client_date_du: new FormControl('', [Validators.required]),
      client_date_au: new FormControl('', [Validators.required]),
    })

    this.chartClient = new Chart(document.getElementById('clientChart'), {
      type: 'line',
      hover: false,
      data: {
        labels: this.labelsClient,
        datasets: [
          {
            data: this.chartClientData,
            fill: false,
            borderColor: '#51bcda',
            backgroundColor: 'transparent',
            pointBorderColor: '#51bcda',
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

  initFilterPaiement() {
    this.fgFilterPaiement = new FormGroup({
      paiement_date_du: new FormControl('', [Validators.required]),
      paiement_date_au: new FormControl('', [Validators.required]),
    })

    this.chartPaiement = new Chart(document.getElementById('paiementChart'), {
      type: 'line',
      hover: false,
      data: {
        labels: this.labelsPaiement,
        datasets: [
          {
            data: this.chartPaiementData,
            fill: false,
            borderColor: '#ef8157',
            backgroundColor: 'transparent',
            pointBorderColor: '#ef8157',
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
      date_au: this.fgFilterGateau.value.gateau_date_au,
      type: 'gateaux',
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
      date_au: this.fgFilterCommand.value.command_date_au,
      type: 'commands',
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

  onSubmitFilterClient() {
    const params = {
      date_du: this.fgFilterClient.value.client_date_du,
      date_au: this.fgFilterClient.value.client_date_au,
      type: 'clients',
    }

    this.command$.chart(params).subscribe((res) => {
      this.chartClientData = []
      this.labelsClient = []

      res.data.map((d: {date: string, count: number}) => {
        this.chartClientData = [...this.chartClientData, d.count]
        this.labelsClient = [...this.labelsClient, formatDate(d.date, 'dd/MM/yyyy', 'fr') ]
      })

      this.chartClient.data.labels = this.labelsClient
      this.chartClient.data.datasets[0].data = this.chartClientData

      this.chartClient.update()
    })
  }

  onSubmitFilterPaiement() {
    const params = {
      date_au: this.fgFilterPaiement.value.paiement_date_au,
      date_du: this.fgFilterPaiement.value.paiement_date_du,
      type: 'paiements',
    }

    this.command$.chart(params).subscribe((res) => {
      this.chartPaiementData = []
      this.labelsPaiement = []

      res.data.map((d: {date: string, count: number}) => {
        this.chartPaiementData = [...this.chartPaiementData, d.count]
        this.labelsPaiement = [...this.labelsPaiement, formatDate(d.date, 'dd/MM/yyyy', 'fr') ]
      })

      this.chartPaiement.data.labels = this.labelsPaiement
      this.chartPaiement.data.datasets[0].data = this.chartPaiementData

      this.chartPaiement.update()
    })
  }

  loadDayData() {
    this.subscription.add(
      this.command$.getDayData()
        .subscribe((res) => {
          if (res.status === StatusCodes.OK) {
            this.dayData = res.data;
          }
        })
    )
  }

  ngOnInit() {
    this.initFilterCommand();
    this.initFilterGateau();
    this.initFilterClient();
    this.initFilterPaiement();
    this.loadDayData();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
