import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {SessionService} from '../services/session.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private sessionService: SessionService, private router: Router) {

  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.sessionService.loggedIn().map(user => {
      if (!user) {
        this.router.navigate(['']);
      }
      return !!user;
    });
  }
}
