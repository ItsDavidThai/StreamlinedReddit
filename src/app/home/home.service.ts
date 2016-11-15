import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
/*
  Services acts as a singleton with methods and properties that can be injected into other components.
  This services main purpose is to share an observable that will update the main feed when
  subscribing/unsubscribing subreddits
*/
@Injectable()
export class HomeService {
  // observable for components to listen when the front page thread is updated
  public frontPageThreadDataUpdated = new BehaviorSubject(null);

  constructor() {}

}
