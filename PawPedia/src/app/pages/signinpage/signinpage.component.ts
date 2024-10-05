import { response } from 'express';
import { error } from 'console';
import { router } from './../../../../../AppDataAPI/src/routes';
import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingBarComponent } from '../../components/loading-bar/loading-bar.component';
import { LoadingService } from '../../services/loading.service';

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

  async signin() {
    this.LoadingService.setLoading(true);
    try {
      const response = await this.UserService.signin(
        this.userData.username,
        this.userData.password,
        this.userData.email
      );
      localStorage.setItem('userData', JSON.stringify(response));
      this.router.navigate(['/']);
      location.href = location.href;
    } catch (error) {
      this.errorMessage = (error as Error).message;
    }
    this.LoadingService.setLoading(false);
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
  }

  constructor(
    private UserService: UserService,
    private router: Router,
    private LoadingService: LoadingService
  ) {}
}
