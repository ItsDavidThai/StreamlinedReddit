import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Http, URLSearchParams, Headers, RequestOptions } from '@angular/http';
import { RedditAPIService } from '../redditAPIService/redditAPI.service';
import { BehaviorSubject } from 'rxjs';
/*
  Services acts as a singleton with methods and properties that can be injected into other components.
  Main purpose of this service is for all authenication related operations.
*/
@Injectable()
export class AuthService {
  // creates an observable to track when the access token changes
  accessToken = new BehaviorSubject(null);
  /*
    services and modules are injected in the constructor
  */
  constructor(private http: Http,
              private redditAPI: RedditAPIService,
              private location:Location) {}
  /*
    sends a get request using the authorization code after the users signs in to get an api access token
    to make requests to the users account based on the permissions requested
  */
  ngGetAccessToken(code) {
    // that = this to maintain context
    let that = this;
    let params: URLSearchParams = new URLSearchParams();
    params.set('code', code);
    return this.http.get('/services/getAccessToken', {search:params}).subscribe(function(res) {
      let token = res.json().access_token;
      // set the token to local storage, security wise this is an alright decision because tokens are short lived
      localStorage.setItem('access_token',token);
      // since the components accessToken is an observable we call next to trigger any subscribers listening for changes
      that.accessToken.next(token);
      // to get the code for the access token request, the reddit api returns the information back in the redirect url and after we use the code to get the access token we clear the url
      that.location.replaceState('');
    })
  }

}
