import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }
  login(){
    this.auth.login();
    this.auth.authUser.subscribe(user => {
      if(!user){
        return;
      }else{
        this.router.navigateByUrl('/pluviometer');
      }
    });
  }
  logout(){
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
