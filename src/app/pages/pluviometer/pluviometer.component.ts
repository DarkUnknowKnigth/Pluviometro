import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { FormControl } from '@angular/forms';
import { generate, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-pluviometer',
  templateUrl: './pluviometer.component.html',
  styleUrls: ['./pluviometer.component.scss']
})
export class PluviometerComponent implements OnInit {
  itemRef: AngularFireObject<any>;
  locations: Observable<any>;
  locationsArray: any[];
  name = new FormControl('');
  latitude: number;
  user: any;
  longitude: number;
  show = false;
  data = ['Locacion Hora Medida'];
  constructor(private db: AngularFireDatabase, private auth: AuthService) {
    this.itemRef = this.db.object('locations');
    this.locations = this.itemRef.valueChanges();
    this.getLocation();
    this.auth.authUser.subscribe( user =>{
      this.user = user;
      this.locations.subscribe( resp => {
        this.locationsArray = Object.values(resp).filter( (l: any ) => l.uid === this.user.uid);
        this.locationsArray.map( l => {
          if(l.measurements){
            l.measurements.map( m => {
              this.data.push(`${l.name} ${m.hour} ${m.nm}`);
            });
          }
        });
      }, err => {
        console.log(err);
      });
    });
    setTimeout(() => {
      this.getLocation();
    }, 5000);
  }
  ngOnInit(): void {
  }
  regist(): void{
    if (!this.name.value) {
      return;
    } else {
      const ref = 'locations/' + this.name.value;
      const itemRef = this.db.object(ref);
      itemRef.set({
        name: this.name.value,
        latitude: this.latitude,
        longitude: this.longitude,
        uid: this.user.uid,
        user: this.user.displayName,
        measurements: []
      });
    }
  }
  deleteLocation(name): void {
    const ref = 'locations/' + name;
    const itemRef = this.db.object(ref);
    itemRef.remove();
  }
  export(): void {
      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.data.join('\n')));
      element.setAttribute('download', 'Pluviometros.txt');
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
  }
  getLocation(): void{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( (position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      });
    } else {
      this.latitude = 0;
      this.longitude = 0;
    }
  }
}
