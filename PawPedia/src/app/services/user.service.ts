import { Injectable } from '@angular/core';
import { ok } from 'assert';
import { error } from 'console';
import { response } from 'express';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  async signin(username: string, password: string, email: string) {
    try {
      const response = await fetch('http://localhost:4000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
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

  async login(username: string, password: string) {
    try {
      const rawResponseData = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!rawResponseData.ok) {
        const responseData = await rawResponseData.json();
        throw new Error(responseData.message);
      }

      return await rawResponseData.json();
    } catch (error) {
      return error;
    }
  }
}
