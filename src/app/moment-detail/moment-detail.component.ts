import {Component, OnDestroy} from '@angular/core';
import {MomentsService} from '../../services/moments.service';
import {ActivatedRoute} from '@angular/router';
import {Moment} from '../../models/moment';

@Component({
  selector: 'app-moment-detail',
  templateUrl: './moment-detail.component.html',
  styleUrls: ['./moment-detail.component.css']
})
export class MomentDetailComponent {

  public moment: Moment;
  public headerImage = '';
  public loading = true;

  constructor(private momentsService: MomentsService,
              private route: ActivatedRoute) {

    this.route.params.subscribe((params) => {
      const id = +params['id'];
      // Get the moment with that id
      this.moment = this.momentsService.getById(id);
      // Set the background to that moment color
      if (this.moment) {
        // Get the image of that moment
        this.getImage();

      }
    });
  }


  private getImage() {
    this.momentsService.getImageUrl(this.moment.picture).subscribe(
      (url) => {
        this.headerImage = url;
      });
  }

}

