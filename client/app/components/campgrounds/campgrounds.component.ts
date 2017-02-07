/**
 * Created by Laurence Ho on 07-02-2017.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CampgroundService } from "../../services/campgounds.service";
import { Campground } from "../../models/campground";

@Component({
    selector: 'my-camps',
    templateUrl: './app/components/campgrounds/campgrounds.component.html',
    styleUrls: ['./app/components/campgrounds/campgrounds.component.css']
})

export class CampgroundsComponent implements OnInit {
    camps: Campground[];

    constructor(private router: Router, private campService: CampgroundService) { }

    getCamps() {
        this.campService.getCamps().then(camps => this.camps = camps);
    }
    ngOnInit() {
        this.getCamps();
    }

    gotoDetail(id: number) {
        this.router.navigate(['/detail', id]);
    }

    addCampground() {
        this.router.navigate(['/detail', 'new']);
    }
}
