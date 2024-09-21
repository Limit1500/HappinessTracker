import { Routes } from '@angular/router';
import { BreedContainerComponent } from './components/breed-container/breed-container.component';
import { DogsFactComponent } from './components/dogs-fact/dogs-fact.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { BreedspageComponent } from './pages/breedspage/breedspage.component';
import { FactspageComponent } from './pages/factspage/factspage.component';
import { SigninpageComponent } from './pages/signinpage/signinpage.component';
import { LoginpageComponent } from './pages/loginpage/loginpage.component';

export const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'breeds', component: BreedspageComponent },
  { path: 'facts', component: FactspageComponent },
  { path: 'signin', component: SigninpageComponent },
  { path: 'login', component: LoginpageComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
