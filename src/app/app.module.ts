import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {AngularFireModule} from 'angularfire2';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {environment} from '../environments/environment';
import {MomentsService} from '../services/moments.service';
import {MomentsListComponent} from './moments-list/moments-list.component';
import {MomentItemComponent} from './moments-list/moment-item/moment-item.component';
import {MomentDetailComponent} from './moment-detail/moment-detail.component';
import {ServiceWorkerModule} from '@angular/service-worker';

const FIREBASE_MODULES = [
  AngularFireModule.initializeApp(environment.firebase),
  AngularFireStorageModule,
  AngularFireDatabaseModule
];

const COMPONENTS = [
  NavBarComponent,
  MomentsListComponent,
  MomentItemComponent,
  MomentDetailComponent
];

const SERVICES = [
  MomentsService
];

@NgModule({
  declarations: [
    AppComponent,
    ...COMPONENTS
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ...FIREBASE_MODULES
  ],
  providers: [
    ...SERVICES,
    {provide: LOCALE_ID, useValue: 'es'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
