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
  fg: FormGroup

  constructor(
    private param$: ParamGeneralService,
    private dialogRef: MatDialogRef<ModalSingleGateauComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData: Gateau = null,
    private command$: CommandService,
    private tools$: ToolsService,
  ) {
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
      console.log(e)
      this.model_url = reader.result as string
      this.fg.get('gateau_model').setValue(reader.result);
    }
    reader.readAsDataURL(file)
  }

  ngOnInit(): void {
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
      gateau_form_param_fk: new FormControl('', [Validators.required]),
      gateau_type_param_fk: new FormControl('', [Validators.required]),
      gateau_decoration: new FormControl('', [Validators.required]),
      gateau_model: new FormControl('', []),
      gateau_message: new FormControl('', [Validators.required]),
      gateau_observation: new FormControl('', [Validators.required]),
      gateau_montant_unitaire: new FormControl('',),
      gateau_montant_total: new FormControl('', [Validators.required])
    })

    if (this.dialogData) {
      this.fg.setValue({
        ...this.fg.value,
        gateau_id: this.dialogData.gateau_id,
        gateau_nb_pax: this.dialogData.gateau_nb_pax,
        gateau_form_param_fk: this.dialogData.gateau_form_param_fk,
        gateau_type_param_fk: this.dialogData.gateau_type_param_fk,
        gateau_decoration: this.dialogData.gateau_decoration,
        gateau_model: this.dialogData.gateau_model,
        gateau_message: this.dialogData.gateau_message,
        gateau_observation: this.dialogData.gateau_observation,
        gateau_montant_unitaire: this.dialogData.gateau_montant_unitaire,
        gateau_montant_total: this.dialogData.gateau_montant_total,
      })
      if (this.dialogData.gateau_model) {
        this.tools$.showSpinner()
        this.command$.getGateauModel(this.dialogData.gateau_id.toString())
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
