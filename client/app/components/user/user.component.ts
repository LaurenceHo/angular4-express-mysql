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
	}

	username: string = '';
	password: string = '';

	doSomething() {
		if (this.route.snapshot.url[0].path === 'login') {
			this.doLogin();
		} else {
			this.doSignup();
		}
	}

	doLogin() {
		this.userService.doLogin(this.username, this.password).then((data) => {
			if (data === 'http://localhost:8080/login') {
				this.router.navigate(['/login']);
			} else if (data === 'http://localhost:8080/profile') {
				this.router.navigate(['/profile']);
			}
		});
	}

	doSignup() {
		this.userService.doSignup(this.username, this.password).then(data => {
			if (data === 'http://localhost:8080/profile') {
				this.router.navigate(['/profile']);
			} else if (data === 'http://localhost:8080/signup') {
				this.router.navigate(['/signup']);
			}
		});
	}

	doLogout() {
		this.userService.doLogout();
	}
}