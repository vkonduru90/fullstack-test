import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'test';
  isTokenExists = false;
  ngOnInit(): void {
  this.isTokenExists = localStorage.getItem('token') ? true : false;
  }
}
