import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OuterSubscriber } from 'rxjs/internal/OuterSubscriber';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-measurements',
  templateUrl: './measurements.component.html',
  styleUrls: ['./measurements.component.scss']
})
export class MeasurementsComponent implements OnInit {
  user: any;
  nm = new FormControl('');
  hour = new FormControl('');
  name: string;
  itemRef: any;
  location: any;
  show= false;
  locationData: any;
  constructor(private auth: AuthService, private route: ActivatedRoute, private db: AngularFireDatabase ) {
    this.auth.authUser.subscribe( user => this.user = user) ;
    this.name = this.route.snapshot.paramMap.get('name');
    const ref = 'locations/' + this.name;
    this.itemRef = this.db.object(ref);
    this.location = this.itemRef.valueChanges();
    this.location.subscribe( resp => {
      this.locationData = resp;
    }, err => {
      console.log(err);
    });
    setTimeout(() => {
      this.getHour();
    }, 1000);
  }
  ngOnInit(): void {
  }
  addMeasurement(): void{
    this.getHour();
    const measurementsOld = this.locationData.measurements;
    if(measurementsOld){
      this.itemRef.update({
        measurements: [...measurementsOld, { hour: this.hour.value, nm: this.nm.value }]
      });
    }
    else{
      this.itemRef.update({
        measurements: [{ hour: this.hour.value, nm: this.nm.value }]
      });
    }
  }
  getHour(): any {
    const now = new Date();
    this.hour.setValue(now.toLocaleString());
  }
}
