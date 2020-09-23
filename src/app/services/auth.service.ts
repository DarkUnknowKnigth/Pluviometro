import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSource = new BehaviorSubject<any>( {} );
  public authUser = this.userSource.asObservable();
  private isAuthSource = new BehaviorSubject<boolean>( false );
  public isAuth = this.isAuthSource.asObservable();
  constructor(private afauth: AngularFireAuth, private router: Router) {
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
    if (u.uid) {
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
}
