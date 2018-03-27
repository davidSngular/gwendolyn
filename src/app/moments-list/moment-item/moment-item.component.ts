import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Moment} from '../../../models/moment';
import {MomentsService} from '../../../services/moments.service';

@Component({
  selector: 'app-moment-item',
  templateUrl: './moment-item.component.html',
  styleUrls: ['./moment-item.component.css']
})
export class MomentItemComponent implements OnChanges {

  @Input() moment: Moment;
  public image = '';

  constructor(private momentsService: MomentsService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.moment) {
      this.momentsService.getImageUrl(this.moment.picture).subscribe(
        (url) => {
          this.image = url;
        });
    }
  }


}

