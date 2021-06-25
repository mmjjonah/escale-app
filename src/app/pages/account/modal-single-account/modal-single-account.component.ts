import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '../../../shared/interfaces/user';

@Component({
  selector: 'app-modal-single-account',
  templateUrl: './modal-single-account.component.html',
  styleUrls: ['./modal-single-account.component.css']
})
export class ModalSingleAccountComponent implements OnInit {
  fg: FormGroup;
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
    this.fg = new FormGroup({
      user_id: new FormControl(-1, [Validators.required]),
      user_lastname: new FormControl('', [Validators.required]),
      user_firstname: new FormControl('', [Validators.required]),
      user_login: new FormControl('', [Validators.required]),
      user_email: new FormControl('', [Validators.required, Validators.email]),
    })
    if (this.dialogData) {
      this.fg.patchValue({
        user_id: this.dialogData.user_id,
        user_lastname: this.dialogData.user_lastname,
        user_firstname: this.dialogData.user_firstname,
        user_login: this.dialogData.user_login,
        user_email: this.dialogData.user_email
      })
    }
  }

}
