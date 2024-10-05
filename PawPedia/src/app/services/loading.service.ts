import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  setLoading(loadingState: boolean) {
    this.dispatchLoadingEvent(loadingState);
  }

  dispatchLoadingEvent(loading: boolean) {
    const event = new CustomEvent('loadingStateChanged', {
      detail: {
        loadingStatus: loading,
      },
    });
    if (typeof window !== 'undefined') {
      window.dispatchEvent(event);
    }
  }

  constructor() {}
}
