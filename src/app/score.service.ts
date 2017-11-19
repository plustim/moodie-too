import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ScoreService {

  constructor(private http: Http) { }

  rateMyFace(facePic: String) {
    return this.http.post('/api/judge', {face: facePic})
      .map(res => res.json());
  }

}
