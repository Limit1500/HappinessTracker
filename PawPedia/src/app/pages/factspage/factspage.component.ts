import { DogsFactComponent } from './../../components/dogs-fact/dogs-fact.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-factspage',
  standalone: true,
  imports: [DogsFactComponent],
  templateUrl: './factspage.component.html',
  styleUrl: './factspage.component.css',
})
export class FactspageComponent {}
