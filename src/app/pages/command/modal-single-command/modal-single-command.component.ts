import {formatDate} from '@angular/common';
import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
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
  numCommand: any = '00000'
  commandData: Command = null

  constructor(
    private matDialog: MatDialog,
    private tools$: ToolsService,
    private dialogRef: MatDialogRef<ModalSingleCommandComponent>,
    private session$: SessionService,
    private command$: CommandService,
    @Inject(MAT_DIALOG_DATA) private dialogData: { commandData: Command, command_type: string },
  ) { }

  get user(): User {
    return this.session$.getUserSession
  }

  get command_type(): string {
    return this.dialogData.command_type
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
        data: {
          gateauData,
          command_type: this.command_type
        },
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
        disableClose: true,
        data: {
          gateauData: null,
          command_type: this.command_type
        }
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
    this.commandData = this.dialogData.commandData
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
      command_accessoire: new FormControl(0, []),
      command_montant_reduction: new FormControl(0, []),
      command_montant_a_compte: new FormControl(0, []),
      command_type: new FormControl(this.command_type, []),
      gateaux: new FormControl('', [Validators.required]),
    })

    if (this.commandData) {
      this.fg.setValue({
        ...this.fg.value,
        client_id: this.commandData.client.client_id,
        command_id: this.commandData.command_id,
        client_lastname: this.commandData.client.client_lastname,
        client_firstname: this.commandData.client.client_firstname,
        client_contact: this.commandData.client.client_contact,
        client_age: this.commandData.client.client_age,
        client_sexe: this.commandData.client.client_sexe,
        command_date_livraison: formatDate(this.commandData.command_date_livraison, 'yyyy-MM-dd', 'fr'),
        command_heure_livraison: formatDate(this.commandData.command_date_livraison, 'H:mm', 'fr'),
        command_lieu_livraison: this.commandData.command_lieu_livraison,
        command_accessoire: this.commandData.command_accessoire,
        command_evenement: this.commandData.command_evenement,
        command_montant_reduction: this.commandData.command_montant_reduction,
        command_montant_a_compte: this.commandData.command_montant_a_compte,
        gateaux: this.commandData.gateaux,
      })
      this.listGateaux = this.commandData.gateaux
      this.montant_total = this.commandData.gateaux
        .map((g) => {
          return g.gateau_montant_total
        })
        .reduce((acc, montant_gateau) => {
          return acc + montant_gateau
        })
      this.montant_reste_payer = this.montant_total - this.commandData.command_montant_a_compte
      this.numCommand = this.commandData.command_id.toString()
      this.numCommand = this.numCommand.padStart(5, '0')
    } else {
      this.setNewNumberCommand()
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
