import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Http, URLSearchParams, Headers, RequestOptions } from '@angular/http';
import { RedditAPIService } from '../redditAPIService/redditAPI.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {
  accessToken = new BehaviorSubject(null);
  constructor(private http: Http, private redditAPI: RedditAPIService, private location:Location) {}

  ngGetAccessToken(code){
    let that = this;
    let params: URLSearchParams = new URLSearchParams();
    params.set('code', code)
    return this.http.get('/services/getAccessToken', {search:params}).subscribe(function(res){
      let token = res.json().access_token;
      localStorage.setItem('access_token',token);

      that.accessToken.next(token)
      that.location.replaceState('')
      console.log(that.accessToken.getValue())
    })
  }

}
