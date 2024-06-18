import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { SharedService } from './shared/shared.service';
import { SharedStore } from './shared/shared-store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-module';
  get isAuth() {
    return this.authService.isAuth;
  }
  constructor(
    private authService: AuthService,
    private router: Router,
    private sharedStore: SharedStore,
    private sharedService: SharedService
  ) {
    this.authService.onAuthStateChanged((user) => {
      if (user) {
        this.authService.onGetProfile.next(user);
        this.authService.profile = user;
        if (this.router.url == '/login' || this.router.url == '/register') {
          this.router.navigate(['/tasks']);
        }
      } else {
        if (this.router.url != '/register') {
          this.router.navigate(['/login']);
        }
      }
    });

    this.sharedService.getAllUsers().subscribe((data) => {
      this.sharedStore.setUsers(data);
    });
  }
}
