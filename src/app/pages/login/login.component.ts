import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isAuth = false;
  constructor(private auth: AuthService, private router: Router) {
    this.auth.isAuth.subscribe( a => this.isAuth = a);
    this.auth.authUser.subscribe(user => {
      if (!user)  {
        return;
      }else{
        this.router.navigateByUrl('/pluviometer');
      }
    }, err => {
      console.log(err);
    });
  }
  ngOnInit(): void {
  }
  async login(): Promise<any> {
    this.auth.login();
  }
  logout(): void{
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
