import { CommonModule } from '@angular/common';
import { BreedsService } from '../../services/breeds.service';
import { FactsService } from '../../services/facts.service';
import { DogsFactComponent } from './../../components/dogs-fact/dogs-fact.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-factspage',
  standalone: true,
  imports: [DogsFactComponent, CommonModule],
  templateUrl: './factspage.component.html',
  styleUrl: './factspage.component.css',
})
export class FactspageComponent {
  facts: { text: string }[] = [];

  async pushFacts() {
    this.facts = await this.factsService.pushFacts(this.facts);
  }

  ngOnInit() {
    this.pushFacts();
  }

  constructor(private factsService: FactsService) {}
}
