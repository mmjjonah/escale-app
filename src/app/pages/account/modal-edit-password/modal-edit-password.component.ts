import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {User} from '../../../shared/interfaces/user';

@Component({
  selector: 'app-modal-edit-password',
  templateUrl: './modal-edit-password.component.html',
  styleUrls: ['./modal-edit-password.component.css']
})
export class ModalEditPasswordComponent implements OnInit {
  fg: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) private dialogData: User
  ) { }

  ngOnInit(): void {
    this.fg = new FormGroup({
      user_login: new FormControl(this.dialogData.user_login),
      user_password: new FormControl('', [Validators.required])
    })
  }

}
