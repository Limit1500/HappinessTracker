import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dogs-fact',
  standalone: true,
  imports: [],
  templateUrl: './dogs-fact.component.html',
  styleUrl: './dogs-fact.component.css',
})
export class DogsFactComponent {
  @Input() text: string = '';
}
