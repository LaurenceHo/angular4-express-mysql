import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CampgroundDetail, CampgroundService } from '../../services/campgounds.service';
import { UserService } from '../../services/user.service';
import { Comment } from '../../models/comment';

/**
 * Created by laurence-ho on 3/07/17.
 */

@Component({
	selector: 'camps',
	templateUrl: './app/components/campgrounds/comment.form.component.html',
	styleUrls: ['./app/components/campgrounds/campgrounds.component.css']
})

export class CommentFormComponent implements OnInit {
	campDetail: CampgroundDetail = new CampgroundDetail();
	comment: Comment = new Comment();
	userdata: any;

	constructor(private campgroundService: CampgroundService,
	            private userService: UserService,
	            private route: ActivatedRoute,
	            private router: Router) {
	}

	ngOnInit() {
		this.userdata = this.userService.getUserData();

		if (!this.userdata) {
			this.router.navigate(['/login']);
		}

		this.route.params
			.switchMap((params: Params) => this.campgroundService.getCampgroundDetail(params['id']))
			.subscribe(data => this.campDetail = data);

		if (this.route.snapshot.url[5].path === 'edit') {
			this.campgroundService.getComment(Number(this.route.snapshot.url[4].path))
				.then(data => this.comment = data.comment)
				.catch(error => {
					if (error.status === 403) {
						this.userService.flush();
						this.router.navigate(['/login']);
					}
				});
		}
	}

	doSubmit() {
		if (this.route.snapshot.url[4].path === 'new') {
			this.comment.user_id = this.userdata.id;
			this.comment.username = this.userdata.username;
			this.comment.campground_id = this.campDetail.campground.id;

			this.campgroundService.createComment(this.comment)
				.then(data => this.router.navigate(['/campground/detail', this.campDetail.campground.id])
					.catch(error => {
						if (error.status === 403) {
							this.userService.flush();
							this.router.navigate(['/login']);
						}
					}));
		} else if (this.route.snapshot.url[4].path !== 'new' && this.route.snapshot.url[5].path === 'edit') {
			this.campgroundService.editComment(this.comment)
				.then(data => this.router.navigate(['/campground/detail', this.campDetail.campground.id]))
				.catch(error => {
					if (error.status === 403) {
						this.userService.flush();
						this.router.navigate(['/login']);
					}
				});
		}
	}
}