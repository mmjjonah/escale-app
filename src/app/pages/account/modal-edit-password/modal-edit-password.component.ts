import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '../../../shared/interfaces/user';

@Component({
  selector: 'app-modal-edit-password',
  templateUrl: './modal-edit-password.component.html',
  styleUrls: ['./modal-edit-password.component.css']
})
export class ModalEditPasswordComponent implements OnInit {
  fg: FormGroup;
  constructor(
    private ref: MatDialogRef<ModalEditPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData: User
  ) { }
  onSubmit() {
    this.ref.close(this.fg.value)
  }

  ngOnInit(): void {
    this.fg = new FormGroup({
      user_id: new FormControl(this.dialogData.user_id),
      user_login: new FormControl(this.dialogData.user_login),
      user_password: new FormControl('', [Validators.required])
    })
  }

}
