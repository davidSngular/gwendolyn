import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Moment} from '../models/moment';
import {AngularFireStorage} from 'angularfire2/storage';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable()
export class SessionService {

  constructor(private afAuth: AngularFireAuth) {
  }

  loggedIn() {
    return this.afAuth.authState;
  }
}
