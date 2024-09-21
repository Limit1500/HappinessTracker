import { Component } from '@angular/core';
import { TextBoxComponent } from '../../components/text-box/text-box.component';
import { BreedContainerComponent } from '../../components/breed-container/breed-container.component';
import { DogsFactComponent } from '../../components/dogs-fact/dogs-fact.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [TextBoxComponent, BreedContainerComponent, DogsFactComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {}
