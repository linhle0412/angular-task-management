import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../shared/shared.service';
import { SharedStore } from '../shared/shared-store';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  form = new FormGroup({
    displayName: new FormControl(''),
    email: new FormControl('', [Validators.email, Validators.required]),
  });
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private sharedService: SharedService,
    private sharedStore: SharedStore
  ) {
    this.authService.onGetProfile.subscribe((user) => {
      this.form.setValue({
        displayName: user.displayName,
        email: user.email,
      });
    });
    this.form.setValue({
      displayName: this.authService.profile.displayName,
      email: this.authService.profile.email,
    });
  }
  get displayName() {
    return this.form.get('displayName');
  }

  onSubmit() {
    this.authService
      .updateProfile(this.displayName?.value!)
      .then(() => {
        
        const user = this.sharedStore.users.find((user) => user.uid == this.authService.profile.uid);
        if (user) {
          this.sharedService.updateUser(user.id!, this.displayName?.value!)
        }
        this.toastr.success('Update profile successfully!');
      })
      .catch((error) => {
        this.toastr.error(error.message);
      });
  }
}
