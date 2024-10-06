import { BreedsService } from './../../services/breeds.service';
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
  @Input() breedId: number = 0;
  @Input() userId: number = 0;

  breedRating: 1 | 2 | 3 | 4 | 5 = 5;

  async addBreedRating(
    breedRating: 1 | 2 | 3 | 4 | 5,
    breedId: number,
    userId: number
  ) {
    console.log(breedRating + ' ' + breedId + ' ' + userId);
    try {
      const response = await this.BreedsService.addBreedRating(
        this.breedRating,
        this.breedId,
        this.userId
      );
    } catch (error) {
      console.log(error);
    }
  }

  constructor(private BreedsService: BreedsService) {}
}
