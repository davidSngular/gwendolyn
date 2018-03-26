import {Component} from '@angular/core';
import {MomentsService} from '../../services/moments.service';
import {Observable} from 'rxjs/Observable';
import {Moment} from '../../models/moment';
import 'rxjs/add/operator/do';

@Component({
  selector: 'app-moments-list',
  templateUrl: './moments-list.component.html',
  styleUrls: ['./moments-list.component.css']
})
export class MomentsListComponent {

  public moments: Observable<Moment[]>;
  public loading = true;

  constructor(public momentsService: MomentsService) {
    this.moments = this.momentsService.get().do(res => {
      this.loading = res.length === 0;
    });
  }

}
