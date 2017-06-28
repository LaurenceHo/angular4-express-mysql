/**
 * Created by laurence-ho on 7/06/17.
 */

import { Headers, Http, RequestOptionsArgs, URLSearchParams } from '@angular/http';
import { User } from '../models/user';
import { Injectable } from '@angular/core';
//import * as _ from 'lodash';

@Injectable()
export class UserService {
	private loginUrl = 'api/login';
	private signupUrl = 'api/signup';
	private logoutUrl = 'api/logout';

	constructor(private http: Http) {
	}

	doLogin(body: any): Promise<User> {
		let requestOptions: RequestOptionsArgs = this.getRequest(body);

		if (requestOptions) {
			return this.http.post(this.loginUrl, requestOptions)
				.toPromise()
				.then(response => response.json())
				.catch(error => console.error('Error: ', error));
		} else {
			return null;
		}
	}

	doSignup(body: any): Promise<User> {
		let requestOptions: RequestOptionsArgs = this.getRequest(body);

		if (requestOptions) {
			return this.http.post(this.signupUrl, requestOptions)
				.toPromise()
				.then(response => response.json())
				.catch(error => console.error('Error: ', error));
		} else {
			return null;
		}
	}

	doLogout() {
		return this.http.get(this.logoutUrl)
			.toPromise()
			.catch(error => console.error('Error: ', error));
	}

	private getRequest(body: any): RequestOptionsArgs {
		const requestOptions: RequestOptionsArgs = {};
		const headers = new Headers({'Accept': '*/*'});

		//if (!_.isEmpty(body)) {
		headers.append('Content-Type', 'application/x-www-form-urlencoded');

		const formBody = new URLSearchParams();

		for (const formParam of Object.keys(body)) {
			formBody.append(formParam, body[formParam]);
		}

		requestOptions.body = formBody.toString();
		requestOptions.headers = headers;
		return requestOptions;

		//}

	}
}