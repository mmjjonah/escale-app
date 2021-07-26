import {formatDate} from '@angular/common';
import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {StatusCodes} from 'http-status-codes';
import {Subscription} from 'rxjs';
import {CommandService} from '../../../layouts/admin-layout/services/command/command.service';
import {Command} from '../../../shared/interfaces/command';
import {Gateau} from '../../../shared/interfaces/gateau';
import {User} from '../../../shared/interfaces/user';
import {SessionService} from '../../../shared/services/session/session.service';
import {ToolsService} from '../../../shared/services/tools/tools.service';
import {ModalSingleGateauComponent} from './modal-single-gateau/modal-single-gateau.component';
import {_c} from '../../../config/constants';

@Component({
  selector: 'app-modal-single-command',
  templateUrl: './modal-single-command.component.html',
  styleUrls: ['./modal-single-command.component.css']
})
export class ModalSingleCommandComponent implements OnInit, OnDestroy {
  listGateaux = []
  displayedColumns = ['id', 'nb_pax', 'forme', 'model', 'montant', 'action']
  fg: FormGroup
  _c = _c
  montant_total = 0
  montant_reste_payer = 0
  subscription = new Subscription()
  dateNow = new Date
  min_date_livraison = formatDate(this.dateNow, 'yyyy-MM-dd', 'fr')
  numCommand: any = '00000';

  constructor(
    private matDialog: MatDialog,
    private tools$: ToolsService,
    private dialogRef: MatDialogRef<ModalSingleCommandComponent>,
    private session$: SessionService,
    private command$: CommandService,
    @Inject(MAT_DIALOG_DATA) private dialogData: Command = null,
    private activatedRoute: ActivatedRoute
  ) { }

  get user(): User {
    return this.session$.getUserSession
  }

  get command_type(): string {
    return this.activatedRoute.snapshot.paramMap.get('command_type')
  }

  onChangeMontantAcompte(event) {
    this.montant_reste_payer = this.montant_total - parseInt(event.target.value, 10)
  }

  supprimerGateau(id: number) {
    this.tools$.confirm({
      message: 'Êtes-vous sure de vouloir supprimer ce gateau?',
      title: 'Suppression'
    }).subscribe((res) => {
      if (res) {
        this.listGateaux = this.listGateaux.filter((el, index) => index !== id)
        this.fg.get('gateaux').setValue(this.listGateaux)
      }
    })
  }

  modifierGateau(gateauData: Gateau) {
    this.subscription.add(
      this.matDialog.open(ModalSingleGateauComponent, {
        width: '800px',
        data: gateauData,
        disableClose: true
      }).afterClosed()
        .subscribe((gateau) => {
          if (gateau) {
            this.listGateaux = this.listGateaux.map(g => {
              if (g.gateau_id === gateau.gateau_id) {
                g = gateau
              }
              return g
            })
            console.log(gateau)
            this.montant_total = 0
            this.listGateaux.map((el) => {
              this.montant_total += parseInt(el.gateau_montant_total, 10)
            })
            this.fg.get('gateaux').setValue(this.listGateaux)
          }
        })
    )
  }

  ajoutGateau() {
    this.subscription.add(
      this.matDialog.open(ModalSingleGateauComponent, {
        width: '800px',
        disableClose: true
      }).afterClosed()
        .subscribe((gateau) => {
          if (gateau) {
            this.listGateaux = [
              ...this.listGateaux,
              gateau
            ]
            this.montant_total = 0
            this.listGateaux.map((el) => {
              this.montant_total += parseInt(el.gateau_montant_total, 10)
            })
            this.fg.get('gateaux').setValue(this.listGateaux)
          }
        })
    )
  }

  onSubmit() {
    this.dialogRef.close(this.fg.value)
  }

  setNewNumberCommand() {
    this.subscription.add(
      this.command$.setNewNumberCommand()
        .subscribe(res => {
          if (res.status === StatusCodes.OK) {
            this.numCommand = res.data.toString().padStart(5, '0')
          }
        })
    )
  }

  ngOnInit(): void {
    this.fg = new FormGroup({
      command_id: new FormControl(null),
      client_id: new FormControl(null),
      client_lastname: new FormControl('', [Validators.required]),
      client_firstname: new FormControl('', [Validators.required]),
      client_contact: new FormControl('', [Validators.required]),
      client_age: new FormControl('', [Validators.required]),
      client_sexe: new FormControl('M', [Validators.required]),
      command_lieu_livraison: new FormControl(''),
      command_date_livraison: new FormControl('', [Validators.required]),
      command_heure_livraison: new FormControl('', [Validators.required]),
      command_evenement: new FormControl('', [Validators.required]),
      command_montant_a_compte: new FormControl('', []),
      command_type: new FormControl(this.command_type, []),
      gateaux: new FormControl('', [Validators.required]),
    })

    if (this.dialogData) {
      this.fg.setValue({
        ...this.fg.value,
        client_id: this.dialogData.client.client_id,
        command_id: this.dialogData.command_id,
        client_lastname: this.dialogData.client.client_lastname,
        client_firstname: this.dialogData.client.client_firstname,
        client_contact: this.dialogData.client.client_contact,
        client_age: this.dialogData.client.client_age,
        client_sexe: this.dialogData.client.client_sexe,
        command_date_livraison: formatDate(this.dialogData.command_date_livraison, 'yyyy-MM-dd', 'fr'),
        command_heure_livraison: formatDate(this.dialogData.command_date_livraison, 'H:mm', 'fr'),
        command_lieu_livraison: this.dialogData.command_lieu_livraison,
        command_evenement: this.dialogData.command_evenement,
        command_montant_a_compte: this.dialogData.command_montant_a_compte,
        gateaux: this.dialogData.gateaux,
      })
      this.listGateaux = this.dialogData.gateaux
      this.montant_total = this.dialogData.gateaux
        .map((g) => {
          return g.gateau_montant_total
        })
        .reduce((acc, montant_gateau) => {
          return acc + montant_gateau
        })
      this.montant_reste_payer = this.montant_total - this.dialogData.command_montant_a_compte
      this.numCommand = this.dialogData.command_id.toString()
      this.numCommand = this.numCommand.padStart(5, '0')
    } else {
      this.setNewNumberCommand()
    }

  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
