/**
 * Created by Laurence Ho on 07-02-2017.
 */
import { Routes, RouterModule } from '@angular/router';

import { CampgroundsComponent } from './components/campgrounds/campgrounds.component';
import { CampDetailComponent } from './components/campgrounds/camp.detail.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/campground',
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

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });