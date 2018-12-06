/**
 * Created by laurence-ho on 7/06/17.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { ApiService } from './api.service';

export type InternalStateType = {
  [ key: string ]: any
};

@Injectable()
export class UserService {
  _state: InternalStateType = {};
  USER_DATA_KEY: string = 'user_data';
  
  private loginUrl = 'api/login';
  private signupUrl = 'api/signup';
  private logoutUrl = 'api/logout';
  private profileUrl = 'api/profile';
  
  constructor(private apiService: ApiService) {
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
    window.localStorage.removeItem(this.USER_DATA_KEY);
  }
  
  private _clone(object: InternalStateType) {
    return JSON.parse(JSON.stringify(object));
  }
  
  setUserData(data: any) {
    if (data) {
      window.localStorage.setItem(this.USER_DATA_KEY, data);
      return this._state[ 'user' ] = data;
    }
  }
  
  getUserData(): any {
    const state = this.state;
    return state.hasOwnProperty('user') ? state[ 'user' ] : undefined;
  }
  
  doLogin(username: string, password: string, remember: boolean): Observable<any> {
    const _params: any = {};
    const _bodyData: any = {};
    const _formParams: any = {};
    
    if (username !== undefined) {
      _formParams[ 'username' ] = username;
    }
    
    if (password !== undefined) {
      _formParams[ 'password' ] = password;
    }
    
    if (remember !== undefined && remember === false) {
      _formParams[ 'remember' ] = remember;
    }
    
    return this.apiService.perform('post', this.loginUrl, _bodyData, _params, _formParams);
  }
  
  doSignup(username: string, password: string): Observable<any> {
    const _params: any = {};
    const _bodyData: any = {};
    const _formParams: any = {};
    
    if (username !== undefined) {
      _formParams[ 'username' ] = username;
    }
    
    if (password !== undefined) {
      _formParams[ 'password' ] = password;
    }
    
    return this.apiService.perform('post', this.signupUrl, _bodyData, _params, _formParams);
  }
  
  doLogout() {
    this.flush();
    
    const _params: any = {};
    const _formParams: any = {};
    const _bodyData: any = {};
    
    return this.apiService.perform('get', this.logoutUrl, _bodyData, _params, _formParams);
  }
  
  getProfile() {
    const _params: any = {};
    const _formParams: any = {};
    const _bodyData: any = {};
    
    return this.apiService.perform('get', this.profileUrl, _bodyData, _params, _formParams);
  }
}
