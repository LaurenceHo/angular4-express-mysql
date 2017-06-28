/**
 * Created by laurence-ho on 7/06/17.
 */

import { Component } from '@angular/core';
import { User } from '../../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
	selector: 'login',
	templateUrl: './app/components/user/user.component.html'
})

export class UserComponent {
	constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {
	}

	username: string = '';
	password: string = '';

	doLogin() {
		let user: User = new User();
		user.username = this.username;
		user.password = this.password;

		this.userService.doLogin(JSON.stringify(user)).then(u => user = u);
	}

	doSignup() {
		let user: User = new User();
		user.username = this.username;
		user.password = this.password;

		this.userService.doSignup(JSON.stringify(user)).then(u => user = u);
	}

	doLogout() {
		this.userService.doLogout();
	}
}