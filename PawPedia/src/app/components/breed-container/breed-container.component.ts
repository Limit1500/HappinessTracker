import { LoadingService } from './../../services/loading.service';
import { CommonModule } from '@angular/common';
import { BreedsService } from './../../services/breeds.service';
import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-breed-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './breed-container.component.html',
  styleUrl: './breed-container.component.css',
})
export class BreedContainerComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() id: number = 0;
  @Input() userId: number = 0;
  @Input() isRated: boolean = false;
  @Input() rating: number = 0;
  @Input() onHomepage: boolean = false;

  async addBreedRating(
    breedRating: 1 | 2 | 3 | 4 | 5,
    breedId: number,
    userId: number
  ) {
    this.LoadingService.setLoading(true);
    try {
      const response = await this.BreedsService.addBreedRating(
        breedRating,
        breedId,
        userId
      );
    } catch (error) {
      console.log(error);
    }
    location.href = location.href;
    this.LoadingService.setLoading(false);
  }

  async removeBreedRating(breedId: number, userId: number) {
    this.LoadingService.setLoading(true);
    try {
      const response = await this.BreedsService.removeBreedRating(
        this.id,
        this.userId
      );
    } catch (error) {
      console.log(error);
    }
    location.href = location.href;
    this.LoadingService.setLoading(false);
  }

  constructor(
    private BreedsService: BreedsService,
    private LoadingService: LoadingService
  ) {}
}
