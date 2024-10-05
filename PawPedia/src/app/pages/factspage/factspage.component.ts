import { LoadingService } from './../../services/loading.service';
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
  facts: string[] = [];
  currentFactIndex = 0;
  currentFact: string = 'undefined';

  async pushFacts() {
    this.LoadingService.setLoading(true);
    this.facts = await this.factsService.pushFacts(this.facts);
    this.LoadingService.setLoading(false);
  }

  initializeFirstFact() {
    this.currentFactIndex = 0;
    this.currentFact = this.facts[this.currentFactIndex];
  }

  async ngOnInit() {
    this.LoadingService.setLoading(true);
    await this.pushFacts();
    this.initializeFirstFact();
    this.nextFact();
    this.LoadingService.setLoading(false);
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

  constructor(
    private factsService: FactsService,
    private LoadingService: LoadingService
  ) {}
}
