/**
 * Created by laurence-ho on 29/06/17.
 */

import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
	selector: 'login',
	templateUrl: './app/components/user/profile.component.html'
})

export class ProfileComponent implements OnInit {
	id: number = 0;
	username: string = '';
	password: string = '';

	constructor(private userService: UserService, private router: Router) {
	}

	ngOnInit() {
		this.userService.getProfile().then(data => {
			this.id = data.id;
			this.username = data.username;
			this.password = data.password;
		}).catch(error => {
			if (error.status === 403) {
				this.userService.flush();
				this.router.navigate(['/login']);
			}
		});
	}
}