import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {AppModule} from '../../app.module';
import {AuthComponent} from '../../pages/auth/auth.component';
import { AuthLayoutComponent } from './auth-layout.component';

const ROUTES: Routes = [
  {
    path: '',
    component: AuthLayoutComponent
  }
]

@NgModule({
  declarations: [
    AuthLayoutComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    ReactiveFormsModule
  ]
})
export class AuthLayoutModule { }
