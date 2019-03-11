import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ListPlacesComponent } from './list-places/list-places.component';
import {AgmCoreModule} from '@agm/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';

@NgModule({
  declarations: [
    AppComponent,
    ListPlacesComponent
  ],
  imports: [
    SweetAlert2Module.forRoot(),
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyDhJ_hqQepu2O4ktd6Q7HA04XZ55B8LOYk',
      authDomain: 'approach-jhipster.firebaseapp.com',
      storageBucket: 'approach-jhipster.appspot.com',
      projectId: 'approach-jhipster',
      databaseURL: 'https://approach-jhipster.firebaseio.com'
    }),
    AngularFireStorageModule,
    NgbModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDYNnmvgQjR2bOPM9hMMWKSdbro_YGaXjA'
    })
  ],
  providers: [AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
