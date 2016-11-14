import { Injectable, EventEmitter } from '@angular/core';
import { Http, URLSearchParams, Headers, RequestOptions } from '@angular/http'
import { Subscription } from 'rxjs';

@Injectable()
export class RedditAPIService {

  subscription: Subscription;

  constructor(private http: Http) {
  }

  fetchFrontPageJSON(){
    let headers = new Headers;
    headers.append('Authorization','BEARER ' + localStorage.getItem('access_token'))
    return this.http.get('https://oauth.reddit.com/.json', { headers: headers }).map(function(result){
      console.log(result)
       return result.json()
    })
  }

  subscribeToSubreddit(sr){
    let body = `sr=${sr}&action=sub`
    console.log(body)
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    headers.append('Authorization', 'BEARER ' + localStorage.getItem('access_token'))
    let options = new RequestOptions({ headers: headers });

    return this.http.post('https://oauth.reddit.com/api/subscribe/', body, options).map(function(result){
       console.log(result)
    })
  }

  unsubscribeFromSubreddit(sr){
    let body = `sr=${sr}&action=unsub`
    console.log(body)
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    headers.append('Authorization', 'BEARER ' + localStorage.getItem('access_token'))
    let options = new RequestOptions({ headers: headers });

    return this.http.post('https://oauth.reddit.com/api/subscribe/', body, options).map(function(result){
       console.log(result)
    })
  }

  getUserSubreddits(){
    let headers = new Headers;
    let params: URLSearchParams = new URLSearchParams();
    params.set('limit', "100")
    headers.append('Authorization','BEARER ' + localStorage.getItem('access_token'))
    return this.http.get('https://oauth.reddit.com/subreddits/mine/subscriber/.json', { headers: headers, search:params }).map(function(result){
       return result.json()
    })
  }

  getPopularSubreddits(){
    let headers = new Headers;
    let params: URLSearchParams = new URLSearchParams();
    params.set('limit', "100")
    headers.append('Authorization','BEARER ' + localStorage.getItem('access_token'))
    return this.http.get('https://oauth.reddit.com/subreddits/popular/?limit=100/.json', { headers: headers, search:params }).map(function(result){
      console.log(result.json())
       return result.json()
    })
  }



}
