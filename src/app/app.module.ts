import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { AuthService } from './services/auth/auth.service';
import { RedditAPIService } from './services/redditAPIService/redditAPI.service'
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ThreadComponent } from './home/thread/thread.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ThreadComponent,
    ThreadComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([{path:'', component: HomeComponent}])
  ],
  providers: [AuthService, RedditAPIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
