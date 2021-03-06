import { Component, OnInit } from '@angular/core';
import { Http, Request } from '@angular/http';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
 
//imported here just for type checking. Optional
import { WebCamComponent } from 'ack-angular-webcam';
 
@Component({
  selector: 'app-taker',
  templateUrl: './taker.component.html',
  styleUrls: ['./taker.component.css'],
  animations: [
    trigger('leafAnimation', [
      state('open', style({height: "100%",  top: "0%"})),
      state('closed', style({height: "0%",  top: "50%"})),
      transition('open <=> closed', animate('200ms linear'))
    ]),
    trigger('apAnimation', [
      state('open', style({transform: "rotate(0deg)"})),
      state('closed', style({transform: "rotate(120deg)"})),
      transition('open <=> closed', animate('200ms ease-in-out'))
    ])
  ]
}) export class TakerComponent implements OnInit{
  webcam:WebCamComponent//will be populated by <ack-webcam [(ref)]="webcam">
  base64
 
  constructor(public http:Http){}

  options = {
    width: "533",
    height: "400",
    fallbackMode: 'callback',
    fallbackSrc: 'jscam_canvas_only.swf',
    fallbackQuality: 85,
    cameraType: 'front'
  };
  sendPhoto;
  pictureEmpty = true;
  submitted = false;
  resultStyle = {width: "0%"};

  ngOnInit() {
  }

  submit(){
    this.sendPhoto = this.base64;
    this.submitted = true;
    this.resultStyle = {width: "98%"};
  }

  leafState:String = "open";
  apState:String = "open";

  resetCamera(){
    this.leafState = 'closed';
    this.apState = 'closed';
    setTimeout(()=>{
      this.pictureEmpty = true;
      this.leafState = 'open';
      this.apState = 'open';
    }, 250)
  }

  genBase64(){
    const canvas = this.webcam.getCanvas();
    const video = this.webcam.getVideoElm();
    this.webcam.setCanvasWidth(canvas, video);
    canvas.getContext('2d').drawImage(video, 0, 0);
    const snap = canvas.toDataURL("image/jpeg", 0.3);
    this.leafState = 'closed';
    this.apState = 'closed';
    setTimeout(()=>{
      this.base64 = snap;
      this.pictureEmpty = false;
      this.leafState = 'open';
      this.apState = 'open';
    }, 250)
  }

  onCamError(err){}
 
  onCamSuccess(event){}

  restart(){
    this.resetCamera();
    this.submitted = false;
    this.resultStyle = {width: "0%"};
  }
}
