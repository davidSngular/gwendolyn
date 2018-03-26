import {Component} from '@angular/core';
import {MomentsService} from '../../services/moments.service';
import {Observable} from 'rxjs/Observable';
import {Moment} from '../../models/moment';

@Component({
  selector: 'app-moments-list',
  templateUrl: './moments-list.component.html',
  styleUrls: ['./moments-list.component.css']
})
export class MomentsListComponent {

  public moments: Observable<Moment[]>;

  constructor(public momentsService: MomentsService) {
    this.moments = this.momentsService.get();
  }

}
