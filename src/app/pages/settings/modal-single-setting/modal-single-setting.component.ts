import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ParamGen} from '../../../shared/interfaces/param-gen';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ParamGeneralService} from '../../../shared/services/param-general/param-general.service';
import {StatusCodes} from 'http-status-codes';
import {ToastService} from '../../../shared/services/toast/toast.service';

@Component({
  selector: 'app-modal-single-setting',
  templateUrl: './modal-single-setting.component.html',
  styleUrls: ['./modal-single-setting.component.css']
})
export class ModalSingleSettingComponent implements OnInit, OnDestroy {
  fg: FormGroup;
  paramCategories = [];
  subscription = new Subscription();

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: ParamGen = null,
    private dialogRef: MatDialogRef<ModalSingleSettingComponent>,
    private param$: ParamGeneralService,
    private toast$: ToastService
  ) { }

  initForm() {
    this.fg = new FormGroup({
      param_id: new FormControl(''),
      param_categories: new FormControl('', Validators.required),
      param_code: new FormControl('', Validators.required),
      param_description: new FormControl('', Validators.required),
      param_ordre: new FormControl('', Validators.pattern(/[0-9]/)),
    })

    if (this.dialogData) {
      this.fg.setValue({
        ...this.fg.value,
        param_id: this.dialogData.param_id,
        param_categories: this.dialogData.param_categories,
        param_description: this.dialogData.param_description,
        param_ordre: this.dialogData.param_ordre,
        param_code: this.dialogData.param_code,
      })
    }
  }

  loadData() {
    this.subscription.add(
      this.param$.getCategories()
        .subscribe(res => {
          if (res.status === StatusCodes.OK) {
            this.paramCategories = res.data;
          }
        })
    )
  }

  onSubmit() {
    if (this.dialogData) {
      this.subscription.add(
        this.param$.updateParam(this.fg.value)
        .subscribe(res => {
            if (res.status === StatusCodes.OK) {
              this.toast$.success('Modification paramétrage', res.message)
              this.dialogRef.close()
            }
          })
      )
    } else {
      this.subscription.add(
        this.param$.createParam(this.fg.value)
          .subscribe(res => {
            if (res.status === StatusCodes.CREATED) {
              this.toast$.success('Création paramétrage', res.message)
              this.dialogRef.close()
            }
          })
      )
    }
  }

  ngOnInit(): void {
    this.initForm();
    this.loadData();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
