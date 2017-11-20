import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { WebCamModule } from 'ack-angular-webcam';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { ScoreService } from './score.service';
import { ScoreComponent } from './score/score.component';
import { TakerComponent } from './taker/taker.component';

// routes
const ROUTES = [
  {
    path: '',
  //   redirectTo: 'posts',
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'posts',
    component: TakerComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ScoreComponent,
    TakerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    WebCamModule,
    BrowserAnimationsModule
  ],
  providers: [ScoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
