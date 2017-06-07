/**
 * Created by Laurence Ho on 07-02-2017.
 */
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CampgroundsComponent} from './components/campgrounds/campgrounds.component';
import {CampDetailComponent} from './components/campgrounds/camp.detail.component';
import {LoginComponent} from './components/user/user.login.component';

const appRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: CampgroundsComponent
    },
    {
        path: 'campground/:id',
        component: CampDetailComponent
    },
    {
        path: 'login',
        component: LoginComponent
    }

];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}