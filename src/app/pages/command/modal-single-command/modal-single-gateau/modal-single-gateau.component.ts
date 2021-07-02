import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {ParamGen} from '../../../../shared/interfaces/param-gen';
import {ParamGeneralService} from '../../../../shared/services/param-general/param-general.service';
import {_c} from '../../../../config/constants';

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
    private dialogRef: MatDialogRef<ModalSingleGateauComponent>
  ) { }

  onSubmit() {
    let data = this.fg.value
    this.listForm.map((el) => {
      if ( parseInt(data.gateau_form_param_fk, 10) === el.param_id) {
        data = {
          ...data,
          form: el.param_description
        }
      }
    })
    this.listType.map((el) => {
      if ( parseInt(data.gateau_type_param_fk, 10) === el.param_id) {
        data = {
          ...data,
          type: el.param_description
        }
      }
    })
    this.dialogRef.close(data)
  }

  handleFileModel(event: any) {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onload = (e) => this.model_url = reader.result as string
    reader.readAsDataURL(file)
    this.fg.get('gateau_model').setValue(file);
  }

  ngOnInit(): void {

    this.fg = new FormGroup({
      gateau_nb_pax: new FormControl('', [Validators.required]),
      gateau_form_param_fk: new FormControl('', [Validators.required]),
      gateau_type_param_fk: new FormControl('', [Validators.required]),
      gateau_decoration: new FormControl('', [Validators.required]),
      gateau_model: new FormControl('', []),
      gateau_message: new FormControl('', [Validators.required]),
      gateau_observation: new FormControl('', [Validators.required]),
      gateau_montant_unitaire: new FormControl('', [Validators.required]),
      gateau_montant_total: new FormControl('', [Validators.required])
    })

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
  }
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
