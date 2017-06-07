/**
 * Created by laurence-ho on 7/06/17.
 */

import {Component} from '@angular/core';
import {User} from '../../models/user';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'login',
  templateUrl: './app/components/user/user.component.html'
})

export class UserComponent {
  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {
  }

  user: User = new User();

  doLogin() {
    this.userService.doLogin(JSON.stringify(this.user)).then(user => this.user = user);
  }

  doSignup(){
    this.userService.doSignup(JSON.stringify(this.user)).then(user => this.user = user);
  }

  doLogout(){

  }
}