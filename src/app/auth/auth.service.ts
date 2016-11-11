import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers, RequestOptions } from '@angular/http'
// import { Router } from

@Injectable()
export class AuthService {

  constructor(private http: Http) {}

  ngGetAccessToken(code){

    // let body = JSON.stringify({grant_type: 'authorization_code', code: code, redirect_uri: 'http://localhost:4200'})
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ body:token});
    // return this.http.post('https://www.reddit.com/api/v1/access_token', body).subscribe(function(res){console.log(res)})
       let params: URLSearchParams = new URLSearchParams();
       params.set('code', code)
    return this.http.get('/services/getAccessToken', {search:params}).subscribe(function(res){
      let token = JSON.parse(res._body).access_token
      console.log(token)
      sessionStorage.setItem("access_token",token)
    })
  }



}
