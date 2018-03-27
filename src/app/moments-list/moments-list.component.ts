import {Component} from '@angular/core';
import {MomentsService} from '../../services/moments.service';
import 'rxjs/add/operator/do';

@Component({
  selector: 'app-moments-list',
  templateUrl: './moments-list.component.html',
  styleUrls: ['./moments-list.component.css']
})
export class MomentsListComponent {

  public momentsByYear;
  public loading = true;
  public error = null;

  constructor(public momentsService: MomentsService) {
    this.momentsService.getByYears().subscribe(res => {
        this.momentsByYear = res;
        this.loading = res.length === 0;
      },
      (err) => {
        this.loading = false;
        this.error = err;
      });
  }
}
