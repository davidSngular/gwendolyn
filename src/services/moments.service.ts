import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Moment} from '../models/moment';
import {Observable} from 'rxjs/Observable';
import {AngularFireStorage} from 'angularfire2/storage';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class MomentsService {

  private _moments = new BehaviorSubject<Moment[]>([]);

  constructor(private afDatabase: AngularFireDatabase,
              private afStorage: AngularFireStorage) {

    this.afDatabase.list('/database/moments').valueChanges().subscribe(
      (res: Moment[]) => {
        this._moments.next(res);
      }
    );
  }

  public get() {
    return this._moments.asObservable();
  }

  public getById(id) {
    return this._moments.asObservable().map((moments: any) => {
      for (const moment of moments) {
        if (moment.id === id) {
          return moment;
        }
      }
    });
  }

  public getImageUrl(name) {
    return this.afStorage.ref(name).getDownloadURL();
  }
}


// export class AppComponent {
//   ref: AngularFireStorageReference;
//   task: AngularFireUploadTask;
//
//   constructor(private afStorage: AngularFireStorage) {
//     // Get image by id
//     this.afStorage.ref('1m135jnxsjq').getDownloadURL().subscribe(
//       (res) => {
//         this.image = res;
//       }
//     );
//   }
//
//   // Upload image
//   upload(event) {
//     const id = Math.random().toString(36).substring(2);
//     this.ref = this.afStorage.ref(id);
//     this.task = this.ref.put(event.target.files[0]);
//   }
// }
