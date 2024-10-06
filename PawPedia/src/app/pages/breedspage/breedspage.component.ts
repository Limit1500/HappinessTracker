import { LoadingService } from './../../services/loading.service';
import { BreedsService } from './../../services/breeds.service';
import { Component } from '@angular/core';
import { BreedContainerComponent } from '../../components/breed-container/breed-container.component';
import { DogsFactComponent } from '../../components/dogs-fact/dogs-fact.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Breed {
  id: number;
  type: string;
  name: string;
  description: string;
  life_max: number;
  life_min: number;
  male_min_weight: number;
  male_max_weight: number;
  female_min_weight: number;
  female_max_weight: number;
  hypoallergenic: boolean;
}
@Component({
  selector: 'app-breedspage',
  standalone: true,
  imports: [
    BreedContainerComponent,
    DogsFactComponent,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './breedspage.component.html',
  styleUrl: './breedspage.component.css',
})
export class BreedspageComponent {
  likedBreeds: Breed[] = [];
  typeSelectedBreeds: Breed[] = [];
  unratedBreeds: Breed[] = [];

  breedRating: 1 | 2 | 3 | 4 | 5 = 1;
  breedId: number = 0;
  userId: number = 0;
  breedType: string = 'Herding';

  getUserData() {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const rawUserData = localStorage.getItem('userData');

      if (rawUserData) {
        try {
          const userData = JSON.parse(rawUserData);
          this.userId = userData.id;
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      }
    } else {
      console.log('ERROR: local storage is not available');
    }
  }

  async searchLikedBreeds(userId: number) {
    try {
      const response = await this.BreedsService.searchLikedBreeds(this.userId);
      this.likedBreeds = response;
    } catch (error) {
      console.log(error);
    }
  }

  async searchBreedType(breedType: string) {
    this.LoadingService.setLoading(true);
    try {
      const response = await this.BreedsService.searchBreedType(this.breedType);
      this.typeSelectedBreeds = response;
    } catch (error) {
      console.log(error);
    }
    this.LoadingService.setLoading(false);
  }

  async searchNewBreeds(userId: number) {
    try {
      const response = await this.BreedsService.searchNewBreeds(this.userId);
      this.unratedBreeds = response;
    } catch (error) {
      console.log(error);
    }
    console.log(this.unratedBreeds);
  }

  ngOnInit() {
    this.LoadingService.setLoading(true);
    this.getUserData();
    this.searchLikedBreeds(this.userId);
    this.searchBreedType(this.breedType);
    this.searchNewBreeds(this.userId);
    this.LoadingService.setLoading(false);
  }

  constructor(
    private BreedsService: BreedsService,
    private LoadingService: LoadingService
  ) {}
}
