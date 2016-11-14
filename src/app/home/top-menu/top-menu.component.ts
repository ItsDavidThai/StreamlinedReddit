import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RedditAPIService } from '../../services/redditAPIService/redditAPI.service';
import { BehaviorSubject } from 'rxjs';


declare var $: any
@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit, AfterViewInit {
  popularSubreddits;
  userSubreddits;

  constructor(private redditAPI: RedditAPIService) {
  }

  ngOnInit() {
    this.populatePopularSubredditDropDown();
    this.populatePopularUserSubredditsDropDown();
  }

  ngAfterViewInit(){
    // jquery needed for materialize functionality
    $(".button-collapse").sideNav();
    $(".dropdown-button").dropdown();
  }

  unsubscribe(sr, index){
    let that = this
    this.userSubreddits.splice(index, 1)
    this.redditAPI.unsubscribeFromSubreddit(sr).subscribe(function(result){
      console.log(result)
    })
  }

  subscribe(sr, index){
    let that = this
    let found = false
    this.userSubreddits.forEach(function(element){
      console.log(element.data.name, sr)
      if(element.data.name === sr){
        found = true
      }
    })
    if(!found){

      this.popularSubreddits.splice(index, 1)
      this.redditAPI.subscribeToSubreddit(sr).subscribe(function(result){
        console.log(result)
      })
    } else {
      window.alert('already subscribed to subreddit')
    }
  }

  populatePopularSubredditDropDown(){
    let that = this
    that.redditAPI.getPopularSubreddits().subscribe(function(result){
      that.popularSubreddits = result.data.children
    });
  }
  populatePopularUserSubredditsDropDown(){
    let that = this
    that.redditAPI.getUserSubreddits().subscribe(function(result){
      that.userSubreddits = result.data.children
      console.log(that.userSubreddits)
    });
  }

}
