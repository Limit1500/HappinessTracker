import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoadingBarComponent } from './components/loading-bar/loading-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavBarComponent,
    FooterComponent,
    LoadingBarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'PawPedia';
  isLoading = false;

  ngOnInit() {
    if (typeof window !== 'undefined') {
      window.addEventListener('loadingStateChanged', (event) => {
        const customEvent = event as CustomEvent;
        this.isLoading = customEvent.detail.loadingStatus;
      });
    }
  }

  ngOnDestroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('loadingStateChanged', (event) => {
        const customEvent = event as CustomEvent;
        this.isLoading = customEvent.detail.loadingStatus;
      });
    }
  }
}
