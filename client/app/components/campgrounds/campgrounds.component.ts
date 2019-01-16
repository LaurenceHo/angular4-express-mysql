/**
 * Created by Laurence Ho on 07-02-2017.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Campground } from '../../models/campground';
import { CampgroundService } from '../../services/campgounds.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'camps',
  templateUrl: './app/components/campgrounds/campgrounds.component.html',
  styleUrls: [ './app/components/campgrounds/campgrounds.component.css' ]
})

export class CampgroundsComponent implements OnInit {
  camps: Campground[];
  userdata: any;
  
  constructor(private router: Router, private campService: CampgroundService, private userService: UserService) {
  }
  
  ngOnInit() {
    this.getCampgrounds();
    this.userdata = this.userService.getUserData();
  }
  
  getCampgrounds() {
    this.campService.getCampgrounds().subscribe(camps => this.camps = camps);
  }
  
  moreInfo(campId: number) {
    this.router.navigateByUrl('/campground/detail/' + campId);
  }
  
  addNewCampground() {
    this.router.navigateByUrl('/campground/new');
  }
}
