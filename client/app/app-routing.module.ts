/**
 * Created by Laurence Ho on 07-02-2017.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CampgroundsComponent } from './components/campgrounds/campgrounds.component';
import { CampDetailComponent } from './components/campgrounds/camp.detail.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'campground',
        pathMatch: 'full'
    },
    {
        path: 'campground',
        component: CampgroundsComponent
    },
    {
        path: 'detail/:id',
        component: CampDetailComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }