/**
 * Created by laurence-ho on 2/07/17.
 */
import { Component, OnInit } from '@angular/core';
import { CampgroundService } from '../../services/campgounds.service';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Campground } from '../../models/campground';

@Component({
	selector: 'campDetail',
	templateUrl: './app/components/campgrounds/campground.form.component.html',
	styleUrls: ['./app/components/campgrounds/campgrounds.component.css']
})

export class CampgroundFormComponent implements OnInit {
	userdata: any;
	campground: Campground = new Campground();

	constructor(private campgroundService: CampgroundService,
	            private userService: UserService,
	            private route: ActivatedRoute,
	            private router: Router) {
	}

	ngOnInit() {
		this.userdata = this.userService.getUserData();

		if (!this.userdata) {
			this.router.navigate(['/login']);
		}

		if (this.route.snapshot.url[1].path !== 'new' && this.route.snapshot.url[3].path === 'edit') {
			this.campgroundService.getCampground(Number(this.route.snapshot.url[2].path))
				.then(data => this.campground = data.campground)
				.catch(error => {
					if (error.status === 403) {
						this.userService.flush();
						this.router.navigate(['/login']);
					}
				});
		}
	}

	doSubmit() {
		if (this.route.snapshot.url[0].path === 'campground') {
			if (this.route.snapshot.url[1].path === 'new') {
				this.campground.user_id = this.userdata.id;
				this.campground.username = this.userdata.username;

				this.campgroundService.createCampground(this.campground)
					.then(data =>
						this.router.navigate(['/campground']))
					.catch(error => {
						if (error.status === 403) {
							this.userService.flush();
							this.router.navigate(['/login']);
						}
					});
			} else if (this.route.snapshot.url[1].path !== 'new' && this.route.snapshot.url[3].path === 'edit') {
				this.campgroundService.editCampground(this.campground)
					.then(data => {
						let id = data.id;
						this.router.navigate(['/campground/detail', id]);
					}).catch(error => {
					if (error.status === 403) {
						this.userService.flush();
						this.router.navigate(['/login']);
					}
				});
			}
		}
	}
}
