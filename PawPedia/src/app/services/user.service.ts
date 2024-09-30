import { Injectable } from '@angular/core';
import { ok } from 'assert';
import { error } from 'console';
import { response } from 'express';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  async signin(username: string, password: string, email: string) {
    fetch('http://localhost:4000/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, email }),
    })
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        console.log(text);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  constructor() {}
}
