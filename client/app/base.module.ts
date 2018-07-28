/**
 * Created by Laurence Ho on 07-02-2017.
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ButtonModule, ProgressSpinnerModule } from 'primeng/primeng';

import { BaseComponent } from './base.component';
import { AppRoutingModule } from './app-routing.module';

import { ApiService } from './services/api.service';
import { CampgroundService } from './services/campgounds.service';
import { UserService } from './services/user.service';

import { UserComponent } from './components/user/user.component';
import { ProfileComponent } from './components/user/profile.component';
import { CampgroundsComponent } from './components/campgrounds/campgrounds.component';
import { CampgroundDetailComponent } from './components/campgrounds/campground.detail.component';
import { CampgroundFormComponent } from './components/campgrounds/campground.form.component';
import { CommentFormComponent } from './components/campgrounds/comment.form.component';

@NgModule({
	imports: [
		// Angular Module
		BrowserModule,
		HttpModule,
		FormsModule,
		AppRoutingModule,
		// Primeng Module
		ButtonModule,
		ProgressSpinnerModule
	],
	declarations: [
		BaseComponent,
		CampgroundsComponent,
		CampgroundDetailComponent,
		CampgroundFormComponent,
		CommentFormComponent,
		UserComponent,
		ProfileComponent
	],
	providers: [
		ApiService,
		CampgroundService,
		UserService,
		{ provide: LocationStrategy, useClass: HashLocationStrategy }
	],
	bootstrap: [BaseComponent]
})
export class BaseModule {
}
