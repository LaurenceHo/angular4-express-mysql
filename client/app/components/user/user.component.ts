/**
 * Created by laurence-ho on 7/06/17.
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
	selector: 'login',
	templateUrl: './app/components/user/user.component.html'
})

export class UserComponent implements OnInit {
	username: string = '';
	password: string = '';
	remember: boolean = false;

	error: boolean = false;
	signupSuccessful: boolean = false;

	message: string = '';

	constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {

	}

	ngOnInit() {
		if (this.route.snapshot.url[0].path === 'login') {
			if (this.userService.getUserData()) {
				this.router.navigate(['/profile']);
			}
		}

		if (this.route.snapshot.url[0].path === 'logout') {
			this.doLogout();
		}
	}

	doSomething() {
		if (this.route.snapshot.url[0].path === 'login') {
			this.doLogin();
		} else {
			this.doSignup();
		}
	}

	doLogin() {
		this.userService.doLogin(this.username, this.password, this.remember).then(data => {
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
