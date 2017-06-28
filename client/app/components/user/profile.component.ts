/**
 * Created by laurence-ho on 29/06/17.
 */

import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'login',
	templateUrl: './app/components/user/profile.component.html'
})

export class ProfileComponent {
	constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {
	}

	//TODO
	getProfile() {

	}
}