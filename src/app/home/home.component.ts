import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import {Router, ActivatedRoute} from '@angular/router';
import {Subscription } from 'rxjs';

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  constructor(private authService: AuthService, private route: ActivatedRoute){
  }
  ngOnInit(){
    console.log('nginited')
    // subscribe to router event
    this.subscription = this.route.queryParams.subscribe(
      (param: any) => {
        this.authService.ngGetAccessToken(param['code'])
        console.log(param['code']);
      });
  }
  ngOnDestroy(){
    console.log('destroy subscription')
    this.subscription.unsubscribe();
  }


}
