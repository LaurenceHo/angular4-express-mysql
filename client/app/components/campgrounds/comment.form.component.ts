import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CampgroundService } from '../../services/campgounds.service';
import { UserService } from '../../services/user.service';
import { Comment } from '../../models/comment';
import { NgForm } from '@angular/forms';

/**
 * Created by laurence-ho on 3/07/17.
 */

@Component({
	selector: 'app-comment',
	templateUrl: './app/components/campgrounds/comment.form.component.html',
	styleUrls: ['./app/components/campgrounds/campgrounds.component.css']
})

export class CommentFormComponent implements OnInit {
	@ViewChild('f') commentForm: NgForm;
	@Input() comment: Comment;
	@Output() insertedComment = new EventEmitter<Comment>();

	userdata: any;
	campground_id: number;

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

		if (!isNaN(Number(this.route.snapshot.url[2].path))) {
			this.campground_id = Number(this.route.snapshot.url[2].path);
		}

		if (!this.comment) {
			this.comment = new Comment();
		}
	}

	doSubmit() {
		this.comment.user_id = this.userdata.id;
		this.comment.username = this.userdata.username;
		this.comment.campground_id = this.campground_id;

		if (this.comment.text) {
			if (!this.comment.id) {
				this.campgroundService.createComment(this.comment)
				// FIXME
				// .then(data => {
				// 	this.campgroundService.getComment(data.comment_id)
				// 		.subscribe(comment => this.insertedComment.emit(comment));
				// })
					.subscribe(data => console.log(data));
			} else {
				this.campgroundService.editComment(this.comment)
					.subscribe(data => console.log(data));// FIXME
			}
		}
		this.commentForm.reset();
	}
}
