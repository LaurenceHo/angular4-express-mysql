/**
 * Created by laurence-ho on 29/06/17.
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

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
    this.userService.getProfile()
      .subscribe(data => {
        this.id = data.id;
        this.username = data.username;
        this.password = data.password;
      });
  }
  
  doLogout() {
    this.router.navigateByUrl('/logout');
  }
}
