import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MapsComponent } from './pages/maps/maps.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { PluviometerComponent } from './pages/pluviometer/pluviometer.component';
import { MeasurementsComponent } from './pages/measurements/measurements.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'maps', component: MapsComponent,  canActivate: [ AngularFireAuthGuard ] },
  { path: 'pluviometer', component: PluviometerComponent,  canActivate: [ AngularFireAuthGuard ] },
  { path: 'measurements', component: MeasurementsComponent,  canActivate: [ AngularFireAuthGuard ] },
  { path: '**',  pathMatch: 'full', redirectTo: 'login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
