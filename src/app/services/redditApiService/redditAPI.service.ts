import { Injectable, EventEmitter } from '@angular/core';
import { Http, URLSearchParams, Headers, RequestOptions } from '@angular/http'
import { Subscription } from 'rxjs';
/*
  Services acts as a singleton with methods and properties that can be injected into other components.
  The main purpose of this service is to handle all reddit api related operations.
*/
@Injectable()
export class RedditAPIService {
  // observable to watch when the u
  subscription: Subscription;

  /*
    services and modules are injected in the constructor
  */
  constructor(private http: Http) {}

  fetchFeedJSON(name) {
    let headers = new Headers;
    let params: URLSearchParams = new URLSearchParams();
    headers.append('Authorization', 'BEARER ' + localStorage.getItem('access_token'))
    params.set('limit', "100")
    return this.http.get(`https://oauth.reddit.com/${name}/.json`, { headers: headers, search:params }).map(function(result){
      console.log(result)
       return result.json()
    })
  }
  /*
    this function is used for infinite scrolling and sends an api request to get another page
    name - subreddit name
    after - query param for next
  */
  fetchNextPage(name, after) {
    // set headers
    let headers = new Headers;
    headers.append('Authorization', 'BEARER ' + localStorage.getItem('access_token'))
    // set query params
    let params: URLSearchParams = new URLSearchParams();
    params.set('limit', "100")
    params.set('after', after)
    name = name || ""
    // Http Get Request
    return this.http.get(`https://oauth.reddit.com/${name}/.json`, { headers: headers, search:params }).map(function(result){
      console.log(result)
       return result.json()
    })
  }
  /*
    sends a post request to add a subreddit to user's subscribed
    sr - subreddit code
  */
  subscribeToSubreddit(sr) {
    // set post headers
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    headers.append('Authorization', 'BEARER ' + localStorage.getItem('access_token'));
    let options = new RequestOptions({ headers: headers });
    //set body params
    let body = `sr=${sr}&action=sub`;
    // Http post request to reddit api
    return this.http.post('https://oauth.reddit.com/api/subscribe/', body, options).map(function(result){
       console.log(result);
    })
  }
  /*
    sends a post request to remove a subreddit from user's subscribed
    sr - subreddit code
  */
  unsubscribeFromSubreddit(sr){
    // set post headers
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    headers.append('Authorization', 'BEARER ' + localStorage.getItem('access_token'))
    let options = new RequestOptions({ headers: headers });
    // set body params
    let body = `sr=${sr}&action=unsub`;
    // Http post request to reddit api
    return this.http.post('https://oauth.reddit.com/api/subscribe/', body, options).map(function(result){
       console.log(result);
    })
  }
  /*
    sends a get request to get a list of user's subscribed reddits
  */
  getUserSubreddits() {
    // set get headers
    let headers = new Headers;
    headers.append('Authorization','BEARER ' + localStorage.getItem('access_token'));
    // set query params
    let params: URLSearchParams = new URLSearchParams();
    params.set('limit', "100");
    // send get request to reddit api
    return this.http.get('https://oauth.reddit.com/subreddits/mine/subscriber/.json', { headers: headers, search:params }).map(function(result){
       return result.json()
    })
  }
  /*
    sends a get request to get a list of popular subreddits
  */
  getPopularSubreddits() {
    // set get headers
    let headers = new Headers;
    headers.append('Authorization','BEARER ' + localStorage.getItem('access_token'))
    // set query params
    let params: URLSearchParams = new URLSearchParams();
    params.set('limit', "100")
    // send get request to reddit api
    return this.http.get('https://oauth.reddit.com/subreddits/popular/?limit=100/.json', { headers: headers, search:params }).map(function(result){
       return result.json()
    })
  }
}
