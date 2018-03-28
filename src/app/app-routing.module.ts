import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MomentsListComponent} from './moments-list/moments-list.component';
import {MomentDetailComponent} from './moment-detail/moment-detail.component';
import {HomeComponent} from './home/home.component';
import {LoggedInGuard} from '../guards/logged-in.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'moments', component: MomentsListComponent, canActivate: [LoggedInGuard]},
  {path: 'moment/:id', component: MomentDetailComponent, canActivate: [LoggedInGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
