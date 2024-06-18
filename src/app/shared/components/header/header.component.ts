import { Component } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private authService: AuthService, private router: Router) {}

  menus = [
    { title: 'Home', link: '/home' },
    { title: 'Tasks', link: '/tasks' },
  ];

  get isAuth() {
    return this.authService.isAuth;
  }
  async logout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }
  login() {
    this.router.navigate(['/login']);
  }
}
