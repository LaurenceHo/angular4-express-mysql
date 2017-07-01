/**
 * Created by laurence-ho on 7/06/17.
 */

import { Headers, Http, RequestOptionsArgs, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// import * as _ from 'lodash';

@Injectable()
export class UserService {
	private loginUrl = 'api/login';
	private signupUrl = 'api/signup';
	private logoutUrl = 'api/logout';
	private profileUrl = 'api/profile';

	constructor(private route: ActivatedRoute, private router: Router, private http: Http) {
	}

	doLogin(username: string, password: string): Promise<any> {
		const _formParams: any = {};

		if (username !== undefined) {
			_formParams['username'] = username;
		}

		if (password !== undefined) {
			_formParams['password'] = password;
		}

		return this.http.request(this.loginUrl, this.getRequest(_formParams))
			.toPromise()
			.then(response => response)
			.catch(error => {
				console.error('Error: ', error);
				if(error.status === 401) {
					this.router.navigate(['/login']);
				}
			});
	}

	doSignup(username: string, password: string): Promise<any> {
		const _formParams: any = {};

		if (username !== undefined) {
			_formParams['username'] = username;
		}

		if (password !== undefined) {
			_formParams['password'] = password;
		}

		return this.http.request(this.signupUrl, this.getRequest(_formParams))
			.toPromise()
			.then(response => response.url)
			.catch(error => {
				console.error('Error: ', error);
				this.router.navigate(['/signup']);
			});

	}

	doLogout() {
		return this.http.get(this.logoutUrl)
			.toPromise()
			.catch(error => console.error('Error: ', error));
	}

	getProfile() {
		return this.http.get(this.profileUrl)
			.toPromise()
			.then(response => response.json())
			.catch(error => console.error('Error:' + JSON.stringify(error)));
	}

	private getRequest(body: any): RequestOptionsArgs {
		const requestOptions: RequestOptionsArgs = {};
		const headers = new Headers({'Accept': '*/*'});

		// if (!_.isEmpty(body)) {
		headers.append('Content-Type', 'application/x-www-form-urlencoded');

		const formBody = new URLSearchParams();

		for (const formParam of Object.keys(body)) {
			formBody.append(formParam, body[formParam]);
		}

		requestOptions.body = formBody.toString();
		requestOptions.headers = headers;
		requestOptions.method = 'post';

		return requestOptions;
		// }
	}
}