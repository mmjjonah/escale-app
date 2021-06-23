import { Injectable } from '@angular/core';
import {User} from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private tokenKey = '__escale_jwt';
  private userKey = '__user';
  private storage: Storage = localStorage;

  constructor() { }
  setSession(token: string, user: User): void {
    this.storage.setItem(this.tokenKey, token);
    this.storage.setItem(this.userKey, JSON.stringify(user));
  }
  clearSession(): void {
    this.storage.removeItem(this.tokenKey);
    this.storage.removeItem(this.userKey);
  }
  get getUserSession(): User {
    return JSON.parse(this.storage.getItem(this.userKey));
  }
}
