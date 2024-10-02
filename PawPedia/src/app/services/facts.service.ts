import { Injectable } from '@angular/core';
import { error } from 'console';

@Injectable({
  providedIn: 'root',
})
export class FactsService {
  async pushFacts(factsArray: { text: string }[]) {
    await fetch('https://dogapi.dog/api/v2/facts?limit=5')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data.data.forEach(
          (fact: {
            id: string;
            type: string;
            attributes: { body: string };
          }) => {
            factsArray.push({ text: fact.attributes.body });
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
    return factsArray;
  }

  constructor() {}
}
