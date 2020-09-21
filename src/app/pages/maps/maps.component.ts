import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { icon, latLng, marker, tileLayer } from 'leaflet';
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {
  latitude = 0;
  longitude = 0;
  locations: any;
  locationsArray = [];
  markers = {};
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      })
    ],
    zoom: 9,
    center: latLng([ 16.7459503, -93.2696561 ])
  };
  itemRef: any;
  layersControl: any;
  // Define our base layers so we can reference them multiple times
  streetMaps = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
  wMaps = tileLayer('http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
  constructor(private db: AngularFireDatabase) {
    this.itemRef = this.db.object('locations');
    this.locations = this.itemRef.valueChanges();
    this.locations.subscribe( resp => {
      this.locationsArray = Object.values(resp);
      this.generateMarkers(this.locationsArray);
      this.layersControl = {
        baseLayers: {
          'Street Maps': this.streetMaps,
          'Wikimedia Maps': this.wMaps
        },
        overlays: this.markers
      };
      this.options = {
        layers: [ this.streetMaps  ],
        zoom: 7,
        center: latLng([ this.latitude, this.longitude ])
      };
    }, err => {
      console.log(err);
    });
  }

  ngOnInit(): void {
    this.getLocation();
  }
  generateMarkers(locations): void{
    locations.forEach(l => {
      if(l.measurements){
        const last = l.measurements[l.measurements.length - 1];
        this.markers[`${l.name} - ${last.hour} - (${last.nm})`] = marker([l.latitude, l.longitude], {
          icon: icon({
            iconSize: [25, 41],
            iconAnchor: [13, 41],
            iconUrl: 'leaflet/marker-icon.png',
            shadowUrl: 'leaflet/marker-shadow.png'
          })
        });
      }
    });
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
