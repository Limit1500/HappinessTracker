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

  textResponse: any = {};

  async signin() {
    this.textResponse = await this.userServices.signin(
      this.userData.username,
      this.userData.password,
      this.userData.email
    );

    if (this.textResponse === 'You have been registered') {
      localStorage.setItem('userData', JSON.stringify(this.userData));
      this.router.navigate(['/']);
      location.href = location.href;
    }
  }

  reRoutePage() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const rawUserData = localStorage.getItem('userData');
      if (rawUserData) {
        this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/signin']);
      }
    }
  }

  ngOnInit() {
    this.reRoutePage();
    this.textResponse = '';
  }

  constructor(private userServices: UserService, private router: Router) {}
}
