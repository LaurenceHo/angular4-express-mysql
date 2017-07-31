/**
 * Created by Laurence Ho on 08-02-2017.
 */

import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { CampgroundDetail, CampgroundService } from '../../services/campgounds.service';
import { UserService } from '../../services/user.service';
import { Comment } from '../../models/comment';
import * as _ from 'lodash';

@Component({
	selector: 'campDetail',
	templateUrl: './app/components/campgrounds/campground.detail.component.html',
	styleUrls: ['./app/components/campgrounds/campgrounds.component.css']
})

export class CampgroundDetailComponent implements OnInit {
	selectedComment: Comment;

	campDetail: CampgroundDetail = new CampgroundDetail();
	userdata: any;

	constructor(private campgroundService: CampgroundService,
	            private userService: UserService,
	            private route: ActivatedRoute,
	            private router: Router) {
	}

	ngOnInit() {
		this.route.params
			.switchMap((params: Params) => this.campgroundService.getCampgroundDetail(params['id']))
			.subscribe(data => this.campDetail = data);
		this.userdata = this.userService.getUserData();
	}

	doDeleteCampground(id: number) {
		if (this.route.snapshot.url[0].path === 'campground') {
			this.campgroundService.deleteCampground(id).subscribe(data => {
				if (data.status === 200) {
					this.router.navigate(['/campground']);
				}
			});
		}
	}

	doEditComment(comment: Comment) {
		this.selectedComment = comment;
	}

	doDeleteComment(comment_id: number) {
		this.campgroundService.deleteComment(comment_id)
			.subscribe(data => {
				if (data.status === 200) {
					_.remove(this.campDetail.comments, (comment) => {
						return comment.id === comment_id;
					});
				}
			});
	}

	updateUI(comment: Comment) {
		let tempComment = comment['comment'];
		this.campDetail.comments.push(tempComment);
	}
}
