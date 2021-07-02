import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
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
export class ModalSingleCommandComponent implements OnInit {
  listGateaux = []
  displayedColumns = ['id', 'nb_pax', 'forme', 'model', 'montant', 'action']
  fg: FormGroup
  _c = _c
  montant_total = 0
  montant_reste_payer = 0

  constructor(
    private matDialog: MatDialog,
    private tools$: ToolsService,
    private dialogRef: MatDialogRef<ModalSingleCommandComponent>,
    private session$: SessionService
  ) { }

  get user(): User { return this.session$.getUserSession }

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
      }
    })
  }

  ajoutGateau() {
    this.matDialog.open(ModalSingleGateauComponent, {
      width: '800px',
      disableClose: true
    }).afterClosed()
      .subscribe((result) => {
        if (result) {
          this.listGateaux = [
            ...this.listGateaux,
            result
          ]
          console.log(result)
          this.montant_total = 0
          this.listGateaux.map((el) => {
            this.montant_total += parseInt(el.gateau_montant_total, 10)
          })
          this.fg.get('list_gateaux').setValue(this.listGateaux)
        }
      })
  }

  onSubmit() {
    this.dialogRef.close(this.fg.value)
  }

  ngOnInit(): void {
    this.fg = new FormGroup({
      client_lastname: new FormControl('', [Validators.required]),
      client_firstname: new FormControl('', [Validators.required]),
      client_contact: new FormControl('', [Validators.required]),
      command_date_livraison: new FormControl('', [Validators.required]),
      command_evenement: new FormControl('', [Validators.required]),
      montant_a_compte: new FormControl('', []),
      list_gateaux: new FormControl('', [Validators.required]),
    })
  }

}
