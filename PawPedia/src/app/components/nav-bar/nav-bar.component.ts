import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  username: string = 'Signin';

  toggleBurgerMenu() {
    document.querySelector('.burger-menu-button')?.classList.toggle('open');
    document.querySelector('.dropdown-menu')?.classList.toggle('open');
  }

  loadUserData() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const rawUserData = localStorage.getItem('userData');
      if (rawUserData) {
        const userData = JSON.parse(rawUserData);
        this.username = userData.username;
        let signInLink = document.querySelector('#singin-link') as HTMLElement;
        if (signInLink) {
          signInLink.style.color = 'green';
        }
      }
    }
  }

  ngOnInit() {
    this.loadUserData();
  }
}
