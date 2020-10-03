import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSource = new BehaviorSubject<any>( {} );
  public authUser = this.userSource.asObservable();
  private isAuthSource = new BehaviorSubject<boolean>( false );
  public isAuth = this.isAuthSource.asObservable();
  constructor(private afauth: AngularFireAuth, private router: Router, private http: HttpClient) {
    this.afauth.authState.subscribe( user => {
      if ( !user ) {
        return;
      }
      this.setAuthUser(user);
      this.setAuthUserStatus(true);
    }, err => {
      console.log(err);
    });
  }
  setAuthUser(user: any): void {
    localStorage.setItem('_PLUVIFY_', JSON.stringify(user));
    this.userSource.next(user);
  }
  setAuthUserStatus(status: boolean): void {
    this.isAuthSource.next(status);
  }
  login(): any {
    const u = JSON.parse(localStorage.getItem('_PLUVIFY_'));
    if (u) {
      this.setAuthUser(u);
      this.setAuthUserStatus(true);
      return;
    }
    this.afauth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout(): void {
    localStorage.removeItem('_PLUVIFY_');
    this.afauth.signOut();
    this.setAuthUser(null);
    this.setAuthUserStatus(false);
    this.router.navigateByUrl('login');
  }
  donate(data: any): Observable<any> {
    return this.http.post('https://www.paypal.com/cgi-bin/webscr', data);
  }
}
