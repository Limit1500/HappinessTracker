import { Injectable } from '@angular/core';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class BreedsService {
  async searchBreedType(breedType: string) {
    try {
      const response = await fetch('http://localhost:4000/searchBreedType', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ breedType }),
      });

      if (!response.ok) {
        let errorResponse = await response.json();
        throw new Error(errorResponse.message);
      }

      return await response.json();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async searchLikedBreeds(userId: number) {
    try {
      const response = await fetch('http://localhost:4000/searchLikedBreeds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        let errorResponse = await response.json();
        throw new Error(errorResponse.message);
      }

      return await response.json();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async addBreedRating(
    breedRating: 1 | 2 | 3 | 4 | 5,
    breedId: number,
    userId: number
  ) {
    try {
      const response = await fetch('http://localhost:4000/addBreedRating', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ breedRating, breedId, userId }),
      });

      if (!response.ok) {
        throw new Error('ERROR: cant add breed rating');
      }

      return await response.json();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async searchNewBreeds(userId: number) {
    try {
      const response = await fetch('http://localhost:4000/searchNewBreeds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        let errorResponse = await response.json();
        throw new Error(errorResponse.message);
      }

      return await response.json();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  constructor(private LoadingService: LoadingService) {}
}
