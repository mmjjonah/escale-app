import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SessionService} from '../../shared/services/session/session.service';
import {AuthService} from '../../layouts/auth-layout/service/auth.service';
import { StatusCodes } from 'http-status-codes';

declare const $;
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoading = false;
  formGroup: FormGroup;
  errorMessage: string;

  constructor(
    private router: Router,
    private auth$: AuthService,
    private session$: SessionService
  ) {
  }

  get login(): AbstractControl {
    return this.formGroup.get('login');
  }

  get password(): AbstractControl {
    return this.formGroup.get('password');
  }

  onSubmit(): void {
    const {login, password} = this.formGroup.value;
    $('.errorMessage').hide('slow');

    this.isLoading = true;
    this.auth$.login(login, password).subscribe((res) => {
      this.isLoading = false;
      if ( res.status === StatusCodes.OK ) {
        const data = res.data;
        this.session$.setSession(data.token, data.user);
        const a = this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = res.message;
        $('.errorMessage').show('slow');
        this.formGroup.markAsUntouched();
      }
    });
  }

  animateLogo(): void {
    $('.js-tilt').tilt({
      scale: 1.1
    });
  }

  initForm(): void {
    this.formGroup = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    if (this.session$.getUserSession) {
      const a = this.router.navigate(['/dashboard']);
    }
    this.animateLogo();
    this.initForm();
  }
}
