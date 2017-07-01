/**
 * Created by Laurence Ho on 08-02-2017.
 */

import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { CampDetail, CampgroundService } from '../../services/campgounds.service';
import { UserService } from '../../services/user.service';

@Component({
	selector: 'campDetail',
	templateUrl: './app/components/campgrounds/campground.detail.component.html',
	styleUrls: ['./app/components/campgrounds/campgrounds.component.css']
})

export class CampgroundDetailComponent implements OnInit {
	campDetail: CampDetail = new CampDetail();
	userdata: any;

	constructor(private campgroundService: CampgroundService,
	            private userService: UserService,
	            private route: ActivatedRoute,
	            private router: Router) {
	}

	ngOnInit() {
		this.route.params
			.switchMap((params: Params) => this.campgroundService.getCamp(params['id']))
			.subscribe(data => this.campDetail = data);
		this.userdata = this.userService.getUserData();
	}

	doDeleteCamp() {
		if (this.route.snapshot.url[0].path === 'campground') {
			this.campgroundService.deleteCamp(Number(this.route.snapshot.url[1].path)).then(data => {
				if (data.status === 200) {
					this.router.navigate(['/campground']);
				}
			}).catch(error => {
					if (error.status === 403) {
						this.router.navigate(['/login']);
					} else {
						this.router.navigate(['/campground/' + this.route.snapshot.url[1].path]);
					}
				}
			)
		}
	}
}