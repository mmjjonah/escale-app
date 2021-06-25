import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ConfirmParams} from '../../interfaces/confirm-params';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.css']
})
export class ModalConfirmComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmParams,
    private dialogRef: MatDialogRef<ModalConfirmComponent>
  ) { }
  result(res: boolean) {
    this.dialogRef.close(res)
  }

  ngOnInit(): void {}

}
