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
    width: 400,
    height: 300,
    fallbackMode: 'callback',
    fallbackSrc: 'jscam_canvas_only.swf',
    fallbackQuality: 85,
    cameraType: 'front'
  };
  facePhoto = "http://www.catster.com/wp-content/uploads/2017/08/A-fluffy-cat-looking-funny-surprised-or-concerned.jpg";
  sendPhoto;
  pictureEmpty = true;

  ngOnInit() {
  }

  submit(){
    console.log("eval");
    this.sendPhoto = this.base64;
  }
 
  // so ack-angular-webcam doesn't seem to support custom arguments correctly
  // genBase64(){
  //   this.webcam.getBase64("image/jpeg")
  //   .then( base=>{
  //     this.base64 = base;
  //     this.pictureEmpty = false;
  //   })
  //   .catch( e=>console.error(e) )
  // }

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
 
  onCamSuccess(){}
}
