import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MomentsListComponent} from './moments-list/moments-list.component';
import {MomentDetailComponent} from './moment-detail/moment-detail.component';

const routes: Routes = [
  {path: '', component: MomentsListComponent},
  {path: 'moment/:id', component: MomentDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
