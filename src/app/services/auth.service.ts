import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSource = new BehaviorSubject<any>( {} );
  public authUser = this.userSource.asObservable();
  constructor(private afauth: AngularFireAuth) {
    this.afauth.authState.subscribe( user => {
      if(!user){
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
  login(): void {
    this.afauth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout(): void {
    this.afauth.signOut();
  }
}
