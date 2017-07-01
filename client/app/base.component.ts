/**
 * Created by Laurence Ho on 07-02-2017.
 */

import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { NavigationEnd, Router } from '@angular/router';
import 'rxjs/add/operator/filter';


@Component({
	selector: 'my-app',
	templateUrl: './app/base.html'
})

export class BaseComponent implements OnInit {
	title = 'YelpCamp';
	userdata: any;

	constructor(private userService: UserService, private router: Router) {
	}

	ngOnInit() {
		this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
				this.userService.getProfile().then(data => {
					if (data) {
						this.userdata = this.userService.getUserData();
					} else {
						this.userService.flush();
					}
				}).catch(error => {
					if (error.status === 403) {
						this.userService.flush();
					}
				});
			}
		);
	}
}