import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {StatusCodes} from 'http-status-codes';
import {Subscription} from 'rxjs';
import {CommandService} from '../../../layouts/admin-layout/services/command/command.service';
import {Command} from '../../../shared/interfaces/command';
import {ToastService} from '../../../shared/services/toast/toast.service';

@Component({
  selector: 'app-modal-retour-client',
  templateUrl: './modal-retour-client.component.html',
  styleUrls: ['./modal-retour-client.component.css']
})
export class ModalRetourClientComponent implements OnInit, OnDestroy {
  formGroup: FormGroup
  subscription = new Subscription()

  constructor(
    @Inject(MAT_DIALOG_DATA) private dialogData: Command,
    private dialogRef: MatDialogRef<ModalRetourClientComponent>,
    private command$: CommandService,
    private toast$: ToastService
  ) { }

  onSubmit() {
    this.subscription.add(
      this.command$.addFeedback({
        command_id: this.dialogData.command_id,
        command_retour_client: this.formGroup.get('command_retour_client').value
      })
        .subscribe((res) => {
          if (res.status === StatusCodes.OK) {
            this.toast$.success('Retour client', res.message)
          }
        })
    )
    this.dialogRef.close(true)
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      command_retour_client: new FormControl(this.dialogData.command_retour_client, [Validators.required])
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
