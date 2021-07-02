import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Group} from '../../../shared/interfaces/group';
import {User} from '../../../shared/interfaces/user';
import {_c} from '../../../config/constants';

@Component({
  selector: 'app-modal-single-account',
  templateUrl: './modal-single-account.component.html',
  styleUrls: ['./modal-single-account.component.css']
})
export class ModalSingleAccountComponent implements OnInit {
  fg: FormGroup;
  groups: Group[] = _c.groups
  isModif = false
  constructor(
    private dialogRef: MatDialogRef<ModalSingleAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: User | false = false
  ) { }
  myInput(name: string) {
    return this.fg.get(name)
  }

  onSubmit() {
    this.dialogRef.close(this.fg.value)
  }
  ngOnInit(): void {
    this.isModif = !!this.dialogData
    if (this.dialogData) {
      this.fg = new FormGroup({
        user_id: new FormControl(this.dialogData.user_id, [Validators.required]),
        user_lastname: new FormControl(this.dialogData.user_lastname, [Validators.required]),
        user_firstname: new FormControl(this.dialogData.user_firstname, [Validators.required]),
        user_group: new FormControl(this.dialogData.user_group, [Validators.required]),
        user_login: new FormControl(this.dialogData.user_login, [Validators.required]),
        user_email: new FormControl(this.dialogData.user_email, [Validators.required, Validators.email]),
      })
    } else {
      this.fg = new FormGroup({
        user_id: new FormControl(-1, [Validators.required]),
        user_lastname: new FormControl('', [Validators.required]),
        user_firstname: new FormControl('', [Validators.required]),
        user_group: new FormControl('', [Validators.required]),
        user_login: new FormControl('', [Validators.required]),
        user_email: new FormControl('', [Validators.required, Validators.email]),
        user_password: new FormControl('', [Validators.required])
      })
    }
  }

}
