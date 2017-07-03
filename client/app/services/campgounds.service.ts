/**
 * Created by Laurence Ho on 07-02-2017.
 */

import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Campground } from '../models/campground';
import { Comment } from '../models/comment';
import * as _ from 'lodash';

export class CampgroundDetail {
	campground: Campground;
	comments: Comment[];
}

@Injectable()
export class CampgroundService {

	private campgroundsUrl = 'api/campground/';  // URL to web api

	constructor(private http: Http) {
	}

	getCampgrounds(): Promise<Campground[]> {
		return this.http.get(this.campgroundsUrl)
			.toPromise()
			.then(response => response.json())
			.catch(error => console.error('Error:' + error));
	}

	getCampgroundDetail(id: number): Promise<CampgroundDetail> {
		return this.http.get(this.campgroundsUrl + id)
			.toPromise()
			.then(response => response.json())
			.catch(error => console.error('Error:' + error));
	}

	getCampground(id: number): Promise<any> {
		return this.http.get(this.campgroundsUrl + id + '/edit')
			.toPromise()
			.then(response => response.json());
	}

	editCampground(campground: Campground): Promise<any> {
		return this.http.request(this.campgroundsUrl + campground.id + '/edit', this.getRequest(campground, 'put'))
			.toPromise()
			.then(response => response.json());
	}

	createCampground(campground: Campground): Promise<any> {
		return this.http.request(this.campgroundsUrl, this.getRequest(campground, 'post'))
			.toPromise()
			.then(response => response.json());
	}

	deleteCampground(id: number): Promise<any> {
		return this.http.delete(this.campgroundsUrl + id)
			.toPromise()
			.then(response => response);
	}

	private getRequest(body: any, method: string): RequestOptionsArgs {
		const requestOptions: RequestOptionsArgs = {};
		const headers = new Headers({'Accept': '*/*'});

		if (!_.isEmpty(body)) {
			headers.append('Content-Type', 'application/json');

			requestOptions.body = JSON.stringify(body);
			requestOptions.headers = headers;
			requestOptions.method = method.toLowerCase();

			return requestOptions;
		}
	}
}