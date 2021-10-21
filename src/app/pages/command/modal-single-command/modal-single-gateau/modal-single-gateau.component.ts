import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {delay} from 'rxjs/operators';
import {_c} from '../../../../config/constants';
import {CommandService} from '../../../../layouts/admin-layout/services/command/command.service';
import {Gateau} from '../../../../shared/interfaces/gateau';
import {ParamGen} from '../../../../shared/interfaces/param-gen';
import {ParamGeneralService} from '../../../../shared/services/param-general/param-general.service';
import {ToolsService} from '../../../../shared/services/tools/tools.service';

@Component({
  selector: 'app-modal-single-gateau',
  templateUrl: './modal-single-gateau.component.html',
  styleUrls: ['./modal-single-gateau.component.css']
})
export class ModalSingleGateauComponent implements OnInit, OnDestroy {
  subscription = new Subscription()
  listForm: ParamGen[] = []
  listType: ParamGen[] = []
  model_url = ''
  _c = _c
  fg: FormGroup
  gateauData: Gateau = null

  constructor(
    private param$: ParamGeneralService,
    private dialogRef: MatDialogRef<ModalSingleGateauComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData: { gateauData: Gateau, command_type: string },
    private command$: CommandService,
    private tools$: ToolsService,
  ) { }

  get command_type(): string {
    return this.dialogData.command_type
  }

  onSubmit() {
    let data = this.fg.value
    this.listForm.map((el) => {
      if (parseInt(data.gateau_form_param_fk, 10) === el.param_id) {
        data = {
          ...data,
          forme: el
        }
      }
    })
    this.listType.map((el) => {
      if (parseInt(data.gateau_type_param_fk, 10) === el.param_id) {
        data = {
          ...data,
          type: el
        }
      }
    })
    this.dialogRef.close(data)
  }

  handleFileModel(event: any) {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      this.model_url = reader.result as string
      this.fg.get('gateau_model').setValue(reader.result);
    }
    reader.readAsDataURL(file)
  }

  ngOnInit(): void {
    this.gateauData = this.dialogData.gateauData
    this.subscription.add(
      this.param$.getParamByCategories(_c.param_categories.FORME_GATEAU)
        .subscribe((res) => {
          this.listForm = res.data
        })
    )
    this.subscription.add(
      this.param$.getParamByCategories(_c.param_categories.TYPE_GATEAU)
        .subscribe((res) => {
          this.listType = res.data
        })
    )

    const uniqueId = new Date().getTime()
    this.fg = new FormGroup({
      gateau_id: new FormControl('new__' + uniqueId, [Validators.required]),
      gateau_nb_pax: new FormControl('', [Validators.required]),
      gateau_form_param_fk: new FormControl(null),
      gateau_type_param_fk: new FormControl(null),
      gateau_decoration: new FormControl('', [Validators.required]),
      gateau_model: new FormControl('', []),
      gateau_arome_special: new FormControl('', []),
      gateau_piece_montee: new FormControl(0, []),
      gateau_layercake: new FormControl(0, []),
      gateau_dripcake: new FormControl(0, []),
      gateau_message: new FormControl(''),
      gateau_observation: new FormControl('', [Validators.required]),
      gateau_montant_unitaire: new FormControl(0, []),
      gateau_montant_total: new FormControl('', [Validators.required])
    })

    if (this.gateauData) {
      this.fg.setValue({
        ...this.fg.value,
        gateau_id: this.gateauData.gateau_id,
        gateau_nb_pax: this.gateauData.gateau_nb_pax,
        gateau_form_param_fk: this.gateauData.gateau_form_param_fk,
        gateau_type_param_fk: this.gateauData.gateau_type_param_fk,
        gateau_decoration: this.gateauData.gateau_decoration,
        gateau_model: this.gateauData.gateau_model,
        gateau_message: this.gateauData.gateau_message,
        gateau_arome_special: this.gateauData.gateau_arome_special,
        gateau_piece_montee: this.gateauData.gateau_piece_montee,
        gateau_layercake: this.gateauData.gateau_layercake,
        gateau_dripcake: this.gateauData.gateau_dripcake,
        gateau_observation: this.gateauData.gateau_observation,
        gateau_montant_unitaire: this.gateauData.gateau_montant_unitaire,
        gateau_montant_total: this.gateauData.gateau_montant_total,
      })
      if (this.gateauData.gateau_model) {
        this.tools$.showSpinner()
        this.command$.getGateauModel(this.gateauData.gateau_id.toString())
          .pipe(
            delay(0)
          )
          .subscribe((res) => {
            this.model_url = 'data:image/png;base64,' + res.data as string
            this.fg.get('gateau_model').setValue(this.model_url);
            this.tools$.hideSpinner()
          })
      }
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
