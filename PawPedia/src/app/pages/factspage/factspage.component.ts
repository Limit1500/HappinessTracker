import { CommonModule } from '@angular/common';
import { BreedsService } from '../../services/breeds.service';
import { FactsService } from '../../services/facts.service';
import { DogsFactComponent } from './../../components/dogs-fact/dogs-fact.component';
import { Component } from '@angular/core';
import test from 'node:test';

@Component({
  selector: 'app-factspage',
  standalone: true,
  imports: [DogsFactComponent, CommonModule],
  templateUrl: './factspage.component.html',
  styleUrl: './factspage.component.css',
})
export class FactspageComponent {
  facts: string[] = [];
  currentFactIndex = 0;
  currentFact: string = 'undefined';

  async pushFacts() {
    this.facts = await this.factsService.pushFacts(this.facts);
  }

  initializeFirstFact() {
    this.currentFactIndex = 0; // Set index to 0 to display the first fact
    this.currentFact = this.facts[this.currentFactIndex]; // Assign the first fact
  }

  async ngOnInit() {
    await this.pushFacts();
    this.initializeFirstFact();
    this.nextFact();
  }

  previousFact() {
    if (this.currentFactIndex >= 1) {
      this.currentFactIndex--;
    }
    this.currentFact = this.facts[this.currentFactIndex];
  }

  nextFact() {
    if (this.currentFactIndex > this.facts.length - 3) {
      this.pushFacts();
    }
    this.currentFactIndex++;
    this.currentFact = this.facts[this.currentFactIndex];
  }

  constructor(private factsService: FactsService) {}
}
