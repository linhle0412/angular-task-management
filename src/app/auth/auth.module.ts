import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AuthComponent, LoginComponent, RegisterComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class AuthModule {}
