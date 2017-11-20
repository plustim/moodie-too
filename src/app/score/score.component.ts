import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { ScoreService } from '../score.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnChanges {
  results: any = {};
  @Input() facePhoto: String;

  constructor(private scoreService: ScoreService) { }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    console.log("uate");
    for (let propName in changes) {
      let changedProp = changes[propName];
      let to = changedProp.currentValue;
      if( typeof to != "undefined" ){
        console.log(`${propName} changed to ${to}`);
        this.giveScore(to);
      }
    }
  }

  giveScore = (facePic: String) => {
    this.scoreService.rateMyFace(facePic).subscribe(results => {
      this.results = results;
      // should add error handling here
    });
  }
}