/**
 * Created by Laurence Ho on 07-02-2017.
 */
import { Component, OnInit } from '@angular/core';

import { CampgroundService } from "../../services/campgounds.service";
import { Campground } from "../../models/campground";

@Component({
    selector: 'my-camps',
    templateUrl: './app/components/campgounds/campgounds.component.html',
    styleUrls: ['./app/components/campgounds/campgounds.component.css']
})

export class CampgroundsComponent implements OnInit {
    camps: Campground[];

    constructor(private campService: CampgroundService) { }

    getCamps() {
        this.campService.getCamps().then(camps => this.camps = camps);
    }
    ngOnInit() {
        this.getCamps();
    }
}
