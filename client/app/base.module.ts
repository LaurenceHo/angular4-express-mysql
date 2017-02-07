/**
 * Created by Laurence Ho on 07-02-2017.
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { BaseComponent } from './base.component';
import { routing } from './app-routing.module';

import { CampgroundsComponent } from './components/campgrounds/campgrounds.component';

import { CampgroundService } from './services/campgounds.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing
  ],
  declarations: [
    BaseComponent,
    CampgroundsComponent
  ],
  providers: [
    CampgroundService
  ],
  bootstrap: [BaseComponent]
})
export class BaseModule { }
