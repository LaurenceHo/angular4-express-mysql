/**
 * Created by laurence-ho on 7/06/17.
 */

import { Headers, Http, RequestOptionsArgs, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

// import * as _ from 'lodash';

export type InternalStateType = {
	[key: string]: any
};

@Injectable()
export class UserService {
	_state: InternalStateType = {};
	USER_DATA_KEY: string = 'user_data';

	private loginUrl = 'api/login';
	private signupUrl = 'api/signup';
	private logoutUrl = 'api/logout';
	private profileUrl = 'api/profile';

	constructor(private http: Http) {
		const userdata = window.localStorage.getItem(this.USER_DATA_KEY);
		if (userdata) {
			try {
				this.setUserData(JSON.parse(userdata));
			} catch (error) {
				console.error('error parsing user data json');
			}
		}
	}

	get state() {
		return this._state = this._clone(this._state);
	}

	set state(value) {
		throw new Error('do not mutate the `.state` directly');
	}

	flush() {
		this._state = {};
	}

	private _clone(object: InternalStateType) {
		return JSON.parse(JSON.stringify(object));
	}

	setUserData(data: any) {
		if (data) {
			window.localStorage.setItem(this.USER_DATA_KEY, JSON.stringify(data));
			return this._state['user'] = data;
		}
	}

	getUserData(): any {
		const state = this.state;
		return state.hasOwnProperty('user') ? state['user'] : undefined;
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
			.then(response => response);
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
			.then(response => response);

	}

	doLogout() {
		this.flush();
		window.localStorage.removeItem(this.USER_DATA_KEY);

		return this.http.get(this.logoutUrl)
			.toPromise()
			.catch(error => console.error('Error: ', error));
	}

	getProfile() {
		return this.http.get(this.profileUrl)
			.toPromise()
			.then(response => response.json())
			.catch(error => console.error('Error:', error));
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