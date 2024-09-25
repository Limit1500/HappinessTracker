import { Component } from '@angular/core';
import { BreedContainerComponent } from '../../components/breed-container/breed-container.component';
import { DogsFactComponent } from '../../components/dogs-fact/dogs-fact.component';

@Component({
  selector: 'app-breedspage',
  standalone: true,
  imports: [BreedContainerComponent, DogsFactComponent],
  templateUrl: './breedspage.component.html',
  styleUrl: './breedspage.component.css',
})
export class BreedspageComponent {}
