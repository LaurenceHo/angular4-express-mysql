/**
 * Created by Laurence Ho on 07-02-2017.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CampgroundsComponent } from './components/campgrounds/campgrounds.component';
import { CampgroundDetailComponent } from './components/campgrounds/campground.detail.component';
import { UserComponent } from './components/user/user.component';
import { ProfileComponent } from './components/user/profile.component';

const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'campground'
  },
  {
    path: 'campground',
    component: CampgroundsComponent
  },
  {
    path: 'campground/:id',
    component: CampgroundDetailComponent
  },
  {
    path: 'login',
    component: UserComponent
  },
  {
    path: 'signup',
    component: UserComponent
  },
  {
    path: 'logout',
    component: UserComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: '**',
    component: CampgroundsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}