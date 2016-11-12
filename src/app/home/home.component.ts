import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { RedditAPIService } from '../services/redditAPIService/redditAPI.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy, OnChanges {

  private subscription: Subscription;
  private redditAPISubscription: Subscription;
  private threadData: Array<Object>;

  constructor(private authService: AuthService,
    private route: ActivatedRoute,
    private redditAPI: RedditAPIService){
  }
  ngOnChanges(){

  }
  ngOnInit(){
    console.log('nginited')
    let that = this;
    // subscribe to router event
    this.subscription = this.route.queryParams.subscribe(
      (param: any) => {
        if(param['code']){
          console.log('authService ran ng get access token')
          this.authService.ngGetAccessToken(param['code'])
        }
      });
    this.authService.accessToken.subscribe(function(result){
      if(result){
      console.log('running load front page', result)
        that.loadFrontPageFeed();
      }
    })
    if(localStorage.getItem('access_token')){
      that.loadFrontPageFeed()
    }

  }
  ngOnDestroy(){
    console.log('destroy subscription')
    this.subscription.unsubscribe();
    this.authService.accessToken.unsubscribe();
  }
  loadFrontPageFeed(){
    console.log('load front page feed ran')
    let that = this
    this.redditAPI.fetchFrontPageJSON().subscribe(function(result){
      console.log(result, ' made it to the home component')
      that.threadData = result.data.children
      that.threadData.forEach(function(thread){
        thread.data.permalink = 'https://www.reddit.com' + thread.data.permalink
      })
    })
  }

}
