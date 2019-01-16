/**
 * Created by Laurence Ho on 07-02-2017.
 */

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/primeng';

import { AppRoutingModule } from './app-routing.module';
import { BaseComponent } from './base.component';

import { ApiService } from './services/api.service';
import { CampgroundService } from './services/campgounds.service';
import { UserService } from './services/user.service';

import { CampgroundDetailComponent } from './components/campgrounds/campground.detail.component';
import { CampgroundFormComponent } from './components/campgrounds/campground.form.component';
import { CampgroundsComponent } from './components/campgrounds/campgrounds.component';
import { CommentFormComponent } from './components/campgrounds/comment.form.component';
import { ProfileComponent } from './components/user/profile.component';
import { UserComponent } from './components/user/user.component';

@NgModule({
  imports: [
    // Angular Module
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    // Primeng Module
    ButtonModule,
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
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [ BaseComponent ]
})
export class BaseModule {
}
