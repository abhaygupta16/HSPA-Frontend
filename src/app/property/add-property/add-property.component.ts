import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs/public_api';
import { Ipropertybase } from 'src/app/model/ipropertybase';


@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {

  @ViewChild('Form') addPropertyForm : NgForm
  @ViewChild('formsTab') formsTab: TabsetComponent;

  propertyTypes :any = ["House","Apartment","Duplex"];
  furnishTypes :any = ["Semi","Fully","Unfurnished"];
  entranceDirection:any = ["East","West","North","South"]

  propertyView : Ipropertybase = {
    Id:null,
    Name:"",
    SellRent:null,
    PType:null,
    FType:null,
    Price:null,
    BHK:null,
    RTM:null,
    City:"",
    BuiltArea:null
  };

  constructor() { }

  ngOnInit() {
  }


  selectTab(tabId: number) {
    this.formsTab.tabs[tabId].active = true;
  }

  onSubmit(Form:NgForm){
    console.log("clicked");
    console.log("SellRent" + this.addPropertyForm.value.BasicInfo.SellRent);
    console.log(this.addPropertyForm);
  }


}
