import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  loggedInUser : string;

  constructor(private alertify:AlertifyService) { }

  ngOnInit() {
  }

  loggedIn(){
    this.loggedInUser = localStorage.getItem("token");
    return this.loggedInUser;
  }

  onLogout(){
    this.alertify.success("Logged Out !")
    return localStorage.removeItem("token");
  }

}
