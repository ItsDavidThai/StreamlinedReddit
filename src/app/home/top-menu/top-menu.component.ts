import { Component, OnInit, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { RedditAPIService } from '../../services/redditAPIService/redditAPI.service';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

// jquery import
declare var $: any;
/*
  Fixed Navigation Bar Component
*/
@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit, AfterViewInit {
  // array to hold popular subreddits
  private popularSubreddits;
  // array to hold user subreddits
  private userSubreddits;
  // allows children -> parent interactions. When this event triggers it notifies the parent component
  @Output() feedChoosen: EventEmitter<string> = new EventEmitter<string>()
  // temporary variable to hold added subreddit name
  constructor(private redditAPI: RedditAPIService,
              private authService: AuthService) {}
  /*
    ngOnInit, ngAfterView Init are component life cycle hooks
    can run different functions when different phases of the component happen
    When this component initializes run these two functions
  */
  ngOnInit() {
    let that = this;
    // populate dropdowns when accessToken is set
    this.authService.accessToken.subscribe(function(result) {
      if(result) {
        that.populatePopularSubredditDropDown();
        that.populatePopularUserSubredditsDropDown();
      }
    })
    // populate dropdowns after accessToken is set
    if(localStorage.getItem('access_token')){
      that.populatePopularUserSubredditsDropDown();
      that.populatePopularSubredditDropDown();
    }
  }
  /*
    when the view initializes
  */
  ngAfterViewInit() {
    // jquery needed for materialize functionality
    $(".button-collapse").sideNav();
    $(".dropdown-button").dropdown();
  }
  /*
    this function calls redditAPI service to unsubscribe from subreddit
  */
  unsubscribe(sr, index) {
    // maintain this context
    let that = this;
    // remove the subreddit from userSubredditsArray
    this.userSubreddits.splice(index, 1);
    // call redditAPI service
    this.redditAPI.unsubscribeFromSubreddit(sr).subscribe(function(result) {
      console.log(result);
    })
  }
  /*
    this function calls redditAPI service to subscribe to a subreddit
  */
  subscribe(sr, index, object) {
    // maintain this context
    let that = this;
    // is user already subscribed to subreddit
    let found = false;
    // checks to see if the subreddit you want to add is in the userSubreddits Array
    // if it is set found to true
    this.userSubreddits.forEach(function(element) {
      if(element.data.name === sr){
        found = true;
      }
    })
    // if user is not subscribed to subreddit call reddit api to add subreddit
    // if not then alert the user it has been added
    if(!found){
      // update userSubreddit dropdown when adding subreddit
      this.userSubreddits.push(object)
      this.redditAPI.subscribeToSubreddit(sr).subscribe(function(result) {
      })
    } else {
      window.alert('already subscribed to subreddit');
    }
  }
  /*
    get an array of popular subreddits and render dropdown from those array items
  */
  populatePopularSubredditDropDown() {
    let that = this;
    that.redditAPI.getPopularSubreddits().subscribe(function(result) {
      that.popularSubreddits = result.data.children;
    });
  }
  /*
    get an array of user's subreddits and render dropdown from those array items
  */
  populatePopularUserSubredditsDropDown() {
    let that = this;
    that.redditAPI.getUserSubreddits().subscribe(function(result) {
      that.userSubreddits = result.data.children;
    });
  }
  /*
    When the user clicks on a feed dropdown item, an event is emitted to tell the parent component
    what feed was choosen
  */
  onFeedClicked(name) {
    this.feedChoosen.emit(name);
  }
}
