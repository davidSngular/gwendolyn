import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable()
export class SessionService {

  constructor(private afAuth: AngularFireAuth) {
  }

  loggedIn() {
    return this.afAuth.authState;
  }
}
