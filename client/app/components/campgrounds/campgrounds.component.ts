/**
 * Created by Laurence Ho on 07-02-2017.
 */
import { Component, OnInit } from '@angular/core';

import { CampgroundService } from '../../services/campgounds.service';
import { Campground } from '../../models/campground';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'camps',
    templateUrl: './app/components/campgrounds/campgrounds.component.html',
    styleUrls: ['./app/components/campgrounds/campgrounds.component.css']
})

export class CampgroundsComponent implements OnInit {
    camps: Campground[];
    userdata: any;

    constructor(private campService: CampgroundService, private userService: UserService) {
    }

    ngOnInit() {
        this.getCampgrounds();
        this.userdata = this.userService.getUserData();
    }

    getCampgrounds() {
        this.campService.getCampgrounds().then(camps => this.camps = camps);
    }
}
