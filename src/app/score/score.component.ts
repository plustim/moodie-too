import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { ScoreService } from '../score.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnChanges {
  results: any = {};
  bar: any = {};
  gotResults:boolean = false;
  @Input() facePhoto: String;

  constructor(private scoreService: ScoreService) { }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    for (let propName in changes) {
      let changedProp = changes[propName];
      let to = changedProp.currentValue;
      if( typeof to != "undefined" ){
        this.giveScore(to);
      }
    }
  }

  giveScore = (facePic: String) => {
    this.gotResults = false;
    this.scoreService.rateMyFace(facePic).subscribe(results => {
      this.results = results;
      this.bar = {
        anger: {width: results.anger + "%"},
        disgust: {width: results.disgust + "%"},
        fear: {width: results.fear + "%"},
        happiness: {width: results.happiness + "%"},
        neutral: {width: results.neutral + "%"},
        sadness: {width: results.sadness + "%"},
        surprise: {width: results.surprise + "%"}
      };
      this.gotResults = true;
      // should add error handling here
    });
  }
}