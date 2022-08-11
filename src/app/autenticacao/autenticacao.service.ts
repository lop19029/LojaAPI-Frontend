import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Token } from './model/token.model';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  private loggedIn = false;
  private logger = new Subject<boolean>();

  constructor(private http : HttpClient) { 
    if (localStorage.getItem('token')) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

  public autenticarUsuario(usuario : Usuario) : Observable<Token> {
      return this.http.post<Token>("http://localhost:8081/v1/auth", usuario);
  }

  isLoggedIn(): Observable<boolean> {
    return this.logger.asObservable();
  }

  logIn(token: string) {
    localStorage.setItem('token', token);
    this.loggedIn = true;
    this.logger.next(this.loggedIn);
  }

  logOut() {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.logger.next(this.loggedIn);
  }
}