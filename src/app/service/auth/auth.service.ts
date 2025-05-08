import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/users'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000';

  userIdSignal = signal<number | null>(null);
  loginStatus = signal<any>(null);
  registerStatus = signal<any>(null);
  roleSignal = signal<string | null>(null);
  private usernameSignal = signal<string | null>(null);

  constructor(private http: HttpClient) {
    if (typeof window !== 'undefined') {
      const storedUserId = localStorage.getItem('userId');
      const storedRole = localStorage.getItem('role');
      const storedToken = localStorage.getItem('token');
      const storedUsername = localStorage.getItem('username');

      if (storedRole && storedToken && storedUserId && storedUsername) {
        this.userIdSignal.set(Number(storedUserId));
        this.roleSignal.set(storedRole);
        this.usernameSignal.set(storedUsername);
        this.loginStatus.set({ userName: storedUsername, token: storedToken, role: storedRole });
      }
    }
  }

  // Registrar usuario
  register(userData: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, userData);
  }

  login(credentials: { User_name: string; Password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
  
}
