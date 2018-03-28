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
import {HomeComponent} from './home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {SessionService} from '../services/session.service';
import {LoggedInGuard} from '../guards/logged-in.guard';
import {SafePipe} from '../pipes/safe.pipe';

const FIREBASE_MODULES = [
  AngularFireModule.initializeApp(environment.firebase),
  AngularFireAuthModule,
  AngularFireStorageModule,
  AngularFireDatabaseModule
];

const COMPONENTS = [
  NavBarComponent,
  MomentsListComponent,
  MomentItemComponent,
  MomentDetailComponent,
  HomeComponent
];

const GUARDS = [
  LoggedInGuard
];

const PIPES = [
  SafePipe
];

const SERVICES = [
  MomentsService,
  SessionService
];

@NgModule({
  declarations: [
    AppComponent,
    ...COMPONENTS,
    ...PIPES
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ...FIREBASE_MODULES
  ],
  providers: [
    ...SERVICES,
    ...GUARDS,
    {provide: LOCALE_ID, useValue: 'es'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
