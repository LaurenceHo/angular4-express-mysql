/**
 * Created by laurence-ho on 2/07/17.
 */
import { Component, OnInit } from '@angular/core';
import { CampgroundService } from '../../services/campgounds.service';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Campground } from '../../models/campground';

@Component({
  selector: 'campDetail',
  templateUrl: './app/components/campgrounds/campground.form.component.html',
  styleUrls: [ './app/components/campgrounds/campgrounds.component.css' ]
})

export class CampgroundFormComponent implements OnInit {
  userdata: any;
  campground: Campground = new Campground();
  
  constructor(private campgroundService: CampgroundService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
  }
  
  ngOnInit() {
    this.userdata = this.userService.getUserData();
    
    if (!this.userdata) {
      this.router.navigate([ '/login' ]);
    }
    
    if (this.route.snapshot.url[ 1 ].path !== 'new' && this.route.snapshot.url[ 3 ].path === 'edit') {
      this.campgroundService.getCampground(Number(this.route.snapshot.url[ 2 ].path))
        .subscribe(data => this.campground = data.campground);
    }
  }
  
  doSubmit() {
    if (this.route.snapshot.url[ 0 ].path === 'campground') {
      if (this.route.snapshot.url[ 1 ].path === 'new') {
        this.campground.user_id = this.userdata.id;
        this.campground.username = this.userdata.username;
        
        this.campgroundService.createCampground(this.campground)
          .subscribe(data => {
            if (data.message === 'OK') {
              this.router.navigate([ '/campground/detail', data.campground_id ]);
            }
          });
      } else if (this.route.snapshot.url[ 1 ].path !== 'new' && this.route.snapshot.url[ 3 ].path === 'edit') {
        this.campgroundService.editCampground(this.campground)
          .subscribe(data => {
            if (data.message === 'OK') {
              this.router.navigate([ '/campground/detail', this.campground.id ]);
            }
          });
      }
    }
  }
}
