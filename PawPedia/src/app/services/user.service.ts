import { Injectable } from '@angular/core';
import { ok } from 'assert';
import { error } from 'console';
import { response } from 'express';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  async signin(
    username: string,
    password: string,
    email: string
  ): Promise<string> {
    let textResponse = '';
    await fetch('http://localhost:4000/signin', {
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
        textResponse = text;
      })
      .catch((error) => {
        console.log(error);
      });
    return textResponse;
  }

  async login(username: string, password: string) {
    let responseData: any = {};
    await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        responseData = data;
      })
      .catch((error) => {
        console.log(error);
      });
    return responseData;
  }

  constructor() {}
}
