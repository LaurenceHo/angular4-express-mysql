/**
 * Created by Laurence Ho on 07-02-2017.
 */

import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { NavigationEnd, Router } from '@angular/router';
import 'rxjs/add/operator/filter';


@Component({
	selector: 'my-app',
	templateUrl: './app/base.html'
})

export class BaseComponent {
	title = 'YelpCamp';
	userdata: any;

	constructor(private userService: UserService, private router: Router) {
		this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event =>
			this.userdata = userService.getUserData()
		);
	}
}