/**
 * Created by Laurence Ho on 07-02-2017.
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { BaseComponent } from './base.component';
import { AppRoutingModule } from './app-routing.module';

import { CampgroundsComponent } from './components/campgrounds/campgrounds.component';
import { CampDetailComponent } from './components/campgrounds/camp.detail.component';
import { UserComponent } from './components/user/user.component';

import { CampgroundService } from './services/campgounds.service';
import { UserService } from './services/user.service';

@NgModule({
	imports: [
		BrowserModule,
		HttpModule,
		FormsModule,
		AppRoutingModule
	],
	declarations: [
		BaseComponent,
		CampgroundsComponent,
		CampDetailComponent,
		UserComponent
	],
	providers: [
		CampgroundService,
		UserService,
		{provide: LocationStrategy, useClass: HashLocationStrategy}
	],
	bootstrap: [BaseComponent]
})
export class BaseModule {
}
