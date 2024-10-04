import { router } from './../../../../../AppDataAPI/src/routes';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginpage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.css',
})
export class LoginpageComponent {
  objectResponse: any = {};
  showLogin: boolean = true;

  username: string = '';
  password: string = '';

  checkLogIn() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const rawUserData = localStorage.getItem('userData');
      if (rawUserData) {
        this.showLogin = false;
      }
    }
  }

  async logIn() {
    this.objectResponse = await this.userServices.login(
      this.username,
      this.password
    );
    if (this.objectResponse.message === 'You are logged in') {
      localStorage.setItem('userData', JSON.stringify(this.objectResponse));
      console.log(this.objectResponse);
      this.router.navigate(['/']);
      location.href = location.href;
    }
  }

  logOut() {
    localStorage.removeItem('userData');
    this.checkLogIn();
    location.href = location.href;
  }

  ngOnInit() {
    this.checkLogIn();
  }

  constructor(private userServices: UserService, private router: Router) {}
}
