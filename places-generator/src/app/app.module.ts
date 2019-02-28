import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ListPlacesComponent } from './list-places/list-places.component';
import {AgmCoreModule} from '@agm/core';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ListPlacesComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDYNnmvgQjR2bOPM9hMMWKSdbro_YGaXjA'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
