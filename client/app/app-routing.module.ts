import { Routes, RouterModule } from '@angular/router';

import { CampgroundsComponent } from './components/campgrounds/campgrounds.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/campground',
        pathMatch: 'full'
    },
    {
        path: 'campground',
        component: CampgroundsComponent
    }
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });
