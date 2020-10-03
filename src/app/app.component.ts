import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
  constructor(public auth: AuthService, private fb: FormBuilder) {
    this.auth.isAuth.subscribe( a => this.isAuth = a);
  }
  donate(): void{
    console.log('envidado');
  }
}
