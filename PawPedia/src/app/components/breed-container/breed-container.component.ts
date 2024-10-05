import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-breed-container',
  standalone: true,
  imports: [],
  templateUrl: './breed-container.component.html',
  styleUrl: './breed-container.component.css',
})
export class BreedContainerComponent {
  @Input() title: string = '';
  @Input() description: string = '';
}
