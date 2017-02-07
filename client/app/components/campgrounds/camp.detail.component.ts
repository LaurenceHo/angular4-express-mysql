/**
 * Created by Laurence Ho on 08-02-2017.
 */

import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { CampgroundService } from "../../services/campgounds.service";
import { CampDetail } from "../../models/camp.detail";

@Component({
    selector: 'my-camp-detail',
    templateUrl: './app/components/campgrounds/camp.detail.component.html'
})

export class CampDetailComponent implements OnInit {
    error: any;
    campdetail: CampDetail;

    constructor(
        private campgroundService: CampgroundService,
        private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.campgroundService.getCamp(+params['id']))
            .subscribe(campdetail => this.campdetail = campdetail);
    }

    goBack() {
        window.history.back();
    }
}