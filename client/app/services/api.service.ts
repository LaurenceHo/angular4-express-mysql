import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptionsArgs, Response, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

@Injectable()
export class ApiService {

	constructor(private http: Http, private router: Router) {
	}

	perform(method: string, urlPath: string, body: any, params: any, formParams: any): Observable<any> {
		const requestOptions: RequestOptionsArgs = {};
		const headers = new Headers({'Accept': '*/*'});

		if (!_.isEmpty(formParams)) {
			// Form submit
			headers.append('Content-Type', 'application/x-www-form-urlencoded');

			const formBody = new URLSearchParams();

			for (const formParam of Object.keys(formParams)) {
				formBody.append(formParam, formParams[formParam]);
			}

			requestOptions.body = formBody.toString();
		} else {
			// JSON content
			headers.append('Content-Type', 'application/json');

			if (body) {
				requestOptions.body = JSON.stringify(body);
			}
		}

		let searchParams = new URLSearchParams();

		if (!_.isEmpty(params)) {
			for (const param of Object.keys(params)) {
				searchParams.append(param, params[param]);
			}
		}

		requestOptions.search = searchParams;
		requestOptions.method = method.toLowerCase();
		requestOptions.headers = headers;

		const methodName = method.toLowerCase();

		if (!this.http[methodName]) {
			throw new Error(`Unknown HTTP method: ${method}`);
		}

		return this.http.request(urlPath, requestOptions)
			.catch((error) => {
				// FIXME, need to handle error
				return Observable.throw(error);
			})
			.map(this.getJson);
	}

	private getJson(response: Response) {
		let formattedResponse;

		try {
			formattedResponse = response.json();
		} catch (error) {
			formattedResponse = response.text();
		}
		return formattedResponse;
	}
}
