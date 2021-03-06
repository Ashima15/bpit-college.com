import { Component, OnInit } from '@angular/core';
import { Configuration } from '../app.constants';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  marquee:any;
  notices:any = [];
  events:any = [];
  eventsLoader:boolean=false;
  noticesLoader:boolean=false;
  

  serveUrl:string="";
  constructor(
    private http: HttpClient,
    private con:Configuration
  ) { 
    this.serveUrl=this.con.server;
  }

  ngOnInit() {
    this.getMarquee();
    this.getNotices();
    this.getEvents();
  }

  getMarquee(){
    this.http.get( this.serveUrl +'marquee/?format=json').subscribe(data => {
      this.marquee = data
    },err=>{});
  }

  getNotices(){
    this.noticesLoader=true;
    this.http.get( this.serveUrl + 'notice/?format=json').subscribe(data => {
      this.noticesLoader=false;
      this.notices = data;
    },err=>{
      this.noticesLoader=false;
    });
  }

  getEvents(){
    this.eventsLoader=true;
    this.http.get( this.serveUrl + 'events/?format=json').subscribe(data => {
    this.eventsLoader=false;      
      this.events = data;
    },err=>{
      this.eventsLoader=false;
    });
  }

}
