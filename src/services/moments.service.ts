import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Moment} from '../models/moment';
import {AngularFireStorage} from 'angularfire2/storage';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MomentsService {

  private _moments = new BehaviorSubject<Moment[]>([]);

  constructor(private afDatabase: AngularFireDatabase,
              private afStorage: AngularFireStorage) {

    const compareFn = (a: Moment, b: Moment) => {
      const dA = (new Date(a.beginDate)).getTime();
      const dB = (new Date(b.beginDate)).getTime();
      return dB - dA;
    };

    this.afDatabase.list('/database/moments')
      .valueChanges()
      // sort the results by their begin date
      .map((moments: Moment[]) => moments.sort(compareFn))
      .subscribe(
        (res: Moment[]) => {
          this._moments.next(res);
        },
        (err) => {
          console.log(err);
          this._moments.error(err);
        }
      );
  }

  public getByYears() {
    const categorizeMoments = (moments) => {
      let items = {};

      for (const m of moments) {
        // Get the date
        const y = (new Date(m.beginDate)).getFullYear();
        // If the year is undefined, create an array
        if (!items[y]) {
          items[y] = [];
        }
        // Push the moment
        items[y].push(m);
      }

      const compareFn = (a, b) => {
        return b[0] - a[0];
      };

      // Convert the object to an array and sort it by the year
      // item[0] => Year
      // item[1] => Array of moments
      return Object.entries(items).sort(compareFn);
    };

    return this._moments.asObservable().map((moments: Moment[]) => categorizeMoments(moments));
  }

  public getById(id) {
    for (const moment of this._moments.getValue()) {
      if (moment.id === id) {
        return moment;
      }
    }

  }

  public getImageUrl(name) {
    if (name) {
      return this.afStorage.ref(name).getDownloadURL();
    } else {
      return Observable.of('./assets/default.jpg');
    }
  }
}

//   // Upload image
//   upload(event) {
//     const id = Math.random().toString(36).substring(2);
//     this.ref = this.afStorage.ref(id);
//     this.task = this.ref.put(event.target.files[0]);
//   }
