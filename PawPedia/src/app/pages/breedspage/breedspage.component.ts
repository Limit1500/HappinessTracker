import { Component } from '@angular/core';
import { BreedContainerComponent } from '../../components/breed-container/breed-container.component';

@Component({
  selector: 'app-breedspage',
  standalone: true,
  imports: [BreedContainerComponent],
  templateUrl: './breedspage.component.html',
  styleUrl: './breedspage.component.css',
})
export class BreedspageComponent {}
