/**
 * Created by Laurence Ho on 08-02-2017.
 */

import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { CampgroundService, CampDetail } from "../../services/campgounds.service";

@Component({
    selector: 'campDetail',
    templateUrl: './app/components/campgrounds/camp.detail.component.html',
    styleUrls:['./app/components/campgrounds/campgrounds.component.css']
})

export class CampDetailComponent implements OnInit {
    error: any;
    campDetail: CampDetail = new CampDetail();

    constructor(
        private campgroundService: CampgroundService,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => this.campgroundService.getCamp(params['id']))
            .subscribe(data => {
                this.campDetail = data;
                console.log(this.campDetail);
            });
    }

    goBack() {
        window.history.back();
    }
}