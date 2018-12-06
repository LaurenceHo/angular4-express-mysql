/**
 * Created by Laurence Ho on 07-02-2017.
 */

import { Injectable } from '@angular/core';
import { Campground } from '../models/campground';
import { Comment } from '../models/comment';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

export class CampgroundDetail {
  campground: Campground;
  comments: any[];
}

@Injectable()
export class CampgroundService {
  
  private campgroundsUrl = 'api/campground/';  // URL to web api
  private commentUrl = 'api/comment/';
  
  constructor(private apiService: ApiService) {
  }
  
  getCampgrounds(): Observable<Campground[]> {
    const _params: any = {};
    const _formParams: any = {};
    const _bodyData: any = {};
    
    return this.apiService.perform('get', this.campgroundsUrl, _bodyData, _params, _formParams);
  }
  
  getCampgroundDetail(id: number): Observable<CampgroundDetail> {
    const _params: any = {};
    const _formParams: any = {};
    const _bodyData: any = {};
    
    return this.apiService.perform('get', this.campgroundsUrl + id, _bodyData, _params, _formParams);
  }
  
  getCampground(id: number): Observable<any> {
    const _params: any = {};
    const _formParams: any = {};
    const _bodyData: any = {};
    const url = this.campgroundsUrl + id + '/edit';
    
    return this.apiService.perform('get', url, _bodyData, _params, _formParams);
  }
  
  editCampground(campground: Campground): Observable<any> {
    const _params: any = {};
    const _formParams: any = {};
    const url = this.campgroundsUrl + campground.id + '/edit';
    
    return this.apiService.perform('put', url, campground, _params, _formParams);
  }
  
  createCampground(campground: Campground): Observable<any> {
    const _params: any = {};
    const _formParams: any = {};
    
    return this.apiService.perform('post', this.campgroundsUrl, campground, _params, _formParams);
  }
  
  deleteCampground(id: number): Observable<any> {
    const _params: any = {};
    const _formParams: any = {};
    const _bodyData: any = {};
    
    return this.apiService.perform('delete', this.campgroundsUrl + id, _bodyData, _params, _formParams);
  }
  
  getComment(id: number): Observable<any> {
    const _params: any = {};
    const _formParams: any = {};
    const _bodyData: any = {};
    const url = this.commentUrl + id + '/edit';
    
    return this.apiService.perform('get', url, _bodyData, _params, _formParams);
  }
  
  editComment(comment: Comment): Observable<any> {
    const _params: any = {};
    const _formParams: any = {};
    const url = this.commentUrl + comment.id + '/edit';
    
    return this.apiService.perform('put', url, comment, _params, _formParams);
  }
  
  createComment(comment: Comment): Observable<any> {
    const _params: any = {};
    const _formParams: any = {};
    
    return this.apiService.perform('post', this.commentUrl, comment, _params, _formParams);
  }
  
  deleteComment(id: number): Observable<any> {
    const _params: any = {};
    const _formParams: any = {};
    const _bodyData: any = {};
    
    return this.apiService.perform('delete', this.commentUrl + id, _bodyData, _params, _formParams);
  }
}
