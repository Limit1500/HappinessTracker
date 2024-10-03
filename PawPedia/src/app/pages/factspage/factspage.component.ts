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
  currentFactIndex = -1;

  async pushFacts() {
    this.facts = await this.factsService.pushFacts(this.facts);
  }

  ngOnInit() {
    this.pushFacts();
    this.nextFact();
  }

  previousFact() {
    document.querySelector('#fact-' + this.currentFactIndex);

    if (this.currentFactIndex >= 1) {
      this.currentFactIndex--;
    }
    console.log(this.currentFactIndex);
  }

  nextFact() {
    document.querySelector('#fact-' + this.currentFactIndex);

    if (this.currentFactIndex > this.facts.length - 3) {
      this.pushFacts();
    }
    this.currentFactIndex++;
    console.log(this.currentFactIndex);
  }

  constructor(private factsService: FactsService) {}
}
