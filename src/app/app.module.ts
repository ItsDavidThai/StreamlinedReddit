import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { AuthService } from './services/auth/auth.service';
import { RedditAPIService } from './services/redditAPIService/redditAPI.service'
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { ThreadComponent } from './home/thread/thread.component';
import { TopMenuComponent } from './home/top-menu/top-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ThreadComponent,
    TopMenuComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([{path:'', component: HomeComponent}]),
    InfiniteScrollModule
  ],
  providers: [AuthService, RedditAPIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
