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
  constructor(private afauth: AngularFireAuth,private router: Router) {
    this.afauth.authState.subscribe( user => {
      if ( !user ) {
        return;
      }
      this.setAuthUser(user);
    }, err => {
      console.log(err);
    });
  }
  setAuthUser(user: any): void {
     this.userSource.next(user);
  }
  setAuthUserStatus(status: boolean): void {
     this.userSource.next(status);
  }
  login(): void {
    this.afauth.signInWithPopup(new auth.GoogleAuthProvider()).then( r => this.setAuthUserStatus(true) );
  }
  logout(): void {
    this.afauth.signOut();
    this.setAuthUserStatus(false);
    this.router.navigateByUrl('login');
  }
}
