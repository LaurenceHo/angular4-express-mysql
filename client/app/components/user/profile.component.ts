/**
 * Created by laurence-ho on 29/06/17.
 */

import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
	selector: 'login',
	templateUrl: './app/components/user/profile.component.html'
})

export class ProfileComponent {
	id: number = 0;
	username: string = '';
	password: string = '';

	constructor(private userService: UserService) {
		this.userService.getProfile().then(data => {
			this.id = data.id;
			this.username = data.username;
			this.password = data.password;
		});
	}
}