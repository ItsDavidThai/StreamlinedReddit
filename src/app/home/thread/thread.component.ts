import { Component, Input, Output, EventEmitter } from '@angular/core';
/*
  This component represents a reddit post/thread
*/
@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent {
  /*
    @input is for parent -> childrens component interaction
    @out is for children -> parent component interaction
  */
  // threadData is passed down from parent, represents post information
  @Input() threadData: Object;
  // event object
  @Output() subredditChoosen: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}

  /*
    when a user clicks a posts' subreddit notify the parent
  */
  onSubredditClicked(name) {
    this.subredditChoosen.emit(name)
  }
}
