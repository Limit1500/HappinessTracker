import { Routes } from '@angular/router';
import { BreedContainerComponent } from './components/breed-container/breed-container.component';
import { DogsFactComponent } from './components/dogs-fact/dogs-fact.component';

export const routes: Routes = [
    { path: 'breed-container', component: BreedContainerComponent },
    { path: 'dogs-fact', component: DogsFactComponent },
];
