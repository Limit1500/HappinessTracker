import { LoadingService } from './../../services/loading.service';
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
  textResponse: string = '';
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
    this.LoadingService.setLoading(true);
    try {
      const response = await this.UserServices.login(
        this.username,
        this.password
      );

      localStorage.setItem('userData', JSON.stringify(response));

      console.log(response);

      location.href = location.href;
    } catch (error) {
      console.log(error);
      this.textResponse = (error as Error).message;
    }
    this.LoadingService.setLoading(false);
  }

  logOut() {
    localStorage.removeItem('userData');
    this.checkLogIn();
    location.href = location.href;
  }

  ngOnInit() {
    this.checkLogIn();
  }

  constructor(
    private UserServices: UserService,
    private router: Router,
    private LoadingService: LoadingService
  ) {}
}
