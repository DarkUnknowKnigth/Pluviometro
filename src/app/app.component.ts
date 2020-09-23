import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Pluvify Cloud';
  showFiller = false;
  isAuth = false;
  constructor(public auth: AuthService) {
    this.auth.isAuth.subscribe( a => this.isAuth = a);
  }
}
