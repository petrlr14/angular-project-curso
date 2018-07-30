import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.css']
})
export class AboutmeComponent implements OnInit {
  public title:string;
  public subTitle:string;
  public email:string;
  constructor() {
    this.title='Pedro Gómez';
    this.subTitle='Developer';
    this.email='pedrodeveloper14@gmail.com';
   }

  ngOnInit() {
  }

}
