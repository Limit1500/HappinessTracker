import { error } from 'console';
import { router } from './../../../../../AppDataAPI/src/routes';
import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signinpage',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signinpage.component.html',
  styleUrl: './signinpage.component.css',
})
export class SigninpageComponent {
  userData = {
    username: '',
    password: '',
    email: '',
  };

  errorMessage: string = '';

  response: {} = {};

  async signin() {
    try {
      this.response = await this.userServices.signin(
        this.userData.username,
        this.userData.password,
        this.userData.email
      );

      localStorage.setItem('userData', JSON.stringify(this.userData));
      this.router.navigate(['/']);
      location.href = location.href;
    } catch (error) {
      console.log((error as Error).message);
      this.errorMessage = (error as Error).message;
    }
  }

  reRoutePage() {
    if (typeof window !== 'undefined' && window.localStorage) {
      console.log('localStorage works');
      const rawUserData = localStorage.getItem('userData');
      if (rawUserData) {
        this.router.navigate(['/login']);
        console.log('userData works' + this.userData);
      } else {
        this.router.navigate(['/signin']);
      }
    }
  }

  ngOnInit() {
    this.reRoutePage();
  }

  constructor(private userServices: UserService, private router: Router) {}
}
