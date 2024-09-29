import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';

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

  signin() {
    this.userServices.signin(
      this.userData.username,
      this.userData.password,
      this.userData.email
    );
  }

  constructor(private userServices: UserService) {}
}
