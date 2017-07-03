/**
 * Created by laurence-ho on 7/06/17.
 */

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
	selector: 'login',
	templateUrl: './app/components/user/user.component.html'
})

export class UserComponent {
	constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {
		if (this.route.snapshot.url[0].path === 'logout') {
			this.doLogout();
		}
	}

	username: string = '';
	password: string = '';
	error: boolean = false;
	signupSuccessful: boolean = false;

	message: string = '';

	doSomething() {
		if (this.route.snapshot.url[0].path === 'login') {
			this.doLogin();
		} else {
			this.doSignup();
		}
	}

	doLogin() {
		this.userService.doLogin(this.username, this.password).then(data => {
			if (data && data.status === 200) {
				this.userService.setUserData(JSON.parse(data._body));
				this.router.navigate(['/profile']);
			}
		}).catch(error => {
			this.error = true;
			let body = error._body;
			this.message = JSON.parse(body).message;
		});
	}

	doSignup() {
		this.userService.doSignup(this.username, this.password).then(data => {
			this.signupSuccessful = true;
			if (data && data.status === 200) {
				this.router.navigate(['/profile']);
			}
		}).catch(error => {
			this.error = true;
			let body = error._body;
			this.message = JSON.parse(body).message;
		});
	}

	doLogout() {
		this.userService.doLogout();
		this.router.navigate(['/campground']);
	}
}