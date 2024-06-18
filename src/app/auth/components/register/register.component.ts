import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SharedService } from '../../../shared/shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
  });
  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
  onSubmit() {
    this.form.controls.email.markAsDirty();
    this.form.controls.password.markAsDirty();
    if (this.form.valid) {
      this.authService
      .register(this.email?.value!, this.password?.value!)
      .then((user) => {
        this.sharedService.addUser({
          email: user.user.email!,
          name: '',
          uid: user.user.uid
        })
        this.toastr.success('Register & login successfully!');
        this.router.navigate(['/tasks']);
      })
      .catch((error) => {
        this.toastr.error(error.message);
      });
    }
 
  }
}
