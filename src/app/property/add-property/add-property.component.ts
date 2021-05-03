import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs/public_api';
import { retry } from 'rxjs/operators';
import { Ipropertybase } from 'src/app/model/ipropertybase';


@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {

  //@ViewChild('Form') addPropertyForm : NgForm
  @ViewChild('formsTab') formsTab: TabsetComponent;
  addPropertyForm:FormGroup;
  nextClicked:boolean;

  propertyTypes :any = ["House","Apartment","Duplex"];
  furnishTypes :any = ["Semi","Fully","Unfurnished"];


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

  constructor(private fb:FormBuilder,private router:Router) { }

  ngOnInit() {
    this.createAddPropertyForm();
  }

  createAddPropertyForm(){
    this.addPropertyForm=this.fb.group({      //these are nested group so that we can separate each tab
      BasicInfo : this.fb.group({
        SellRent:['1',Validators.required],
        BHK: [null, Validators.required],
        PType:[null,Validators.required],
        FType:[null,Validators.required],
        Name:[null,Validators.required],
        City:[null,Validators.required],
      }),

      PriceInfo : this.fb.group({
        Price:[null,Validators.required],
        Security: [null],
        Maintenance: [null],
        BuiltArea:[null,Validators.required],
        CarpetArea: [null]
      }),

      AddressInfo : this.fb.group({
        FloorNo: [null],
        TotalFloor: [null],
        Address: [null, Validators.required],
        LandMark: [null],
      }),

      OtherInfo: this.fb.group({
        RTM: [null, Validators.required],
        PosessionOn: [null],
        AOP: [null],
        Gated: [null],
        MainEntrance: [null],
        Description: [null]
      })

    });
  }

  //----------------
    //Getter Methods for formGroups

    //#region
    get BasicInfo(){
      return this.addPropertyForm.controls.BasicInfo as FormGroup;
    }

    get PriceInfo(){
      return this.addPropertyForm.controls.PriceInfo as FormGroup;
    }

    get AddressInfo() {
      return this.addPropertyForm.controls.AddressInfo as FormGroup;
    }

    get OtherInfo() {
      return this.addPropertyForm.controls.OtherInfo as FormGroup;
    }
    //#endregion

    //Getter Methods for formControls
    //#region
    get SellRent() {
      return this.BasicInfo.controls.SellRent as FormControl;
    }

    get BHK() {
      return this.BasicInfo.controls.BHK as FormControl;
    }

    get PType() {
      return this.BasicInfo.controls.PType as FormControl;
    }

    get FType() {
      return this.BasicInfo.controls.FType as FormControl;
    }

    get Name() {
      return this.BasicInfo.controls.Name as FormControl;
    }

    get City() {
      return this.BasicInfo.controls.City as FormControl;
    }

    // For Pricing Tab
    get Price() {
      return this.PriceInfo.controls.Price as FormControl;
    }

    get BuiltArea() {
      return this.PriceInfo.controls.BuiltArea as FormControl;
    }

    get CarpetArea() {
      return this.PriceInfo.controls.CarpetArea as FormControl;
    }

    get Security() {
      return this.PriceInfo.controls.Security as FormControl;
    }

    get Maintenance() {
      return this.PriceInfo.controls.Maintenance as FormControl;
    }

    //For Address Tab
    get FloorNo() {
      return this.AddressInfo.controls.FloorNo as FormControl;
    }

    get TotalFloor() {
      return this.AddressInfo.controls.TotalFloor as FormControl;
    }

    get Address() {
      return this.AddressInfo.controls.Address as FormControl;
    }

    get LandMark() {
      return this.AddressInfo.controls.LandMark as FormControl;
    }

    //For OtherInfo Tab
    get RTM() {
      return this.OtherInfo.controls.RTM as FormControl;
    }

    get Possesion() {
      return this.OtherInfo.controls.PosessionOn as FormControl;
    }

    get AOP() {
      return this.OtherInfo.controls.AOP as FormControl;
    }

    get Gated() {
      return this.OtherInfo.controls.Gated as FormControl;
    }

    get MainEntrace() {
      return this.OtherInfo.controls.MainEntrance as FormControl;
    }

    get Description() {
      return this.OtherInfo.controls.Description as FormControl;
    }
    //#endregion


  selectTab(tabId: number,isCurrentTabValid: boolean) {
    this.nextClicked=true;
    if(isCurrentTabValid){
      this.formsTab.tabs[tabId].active = true;
    }
  }

  onSubmit(){
    this.nextClicked=true;

    if(this.allTabsValidated()){
      console.log('Congrats, your property listed successfully on our website');
    }else{
      console.log('Kindly Review all tabs of the form again');
    }
    console.log(this.addPropertyForm);
  }

  allTabsValidated() : boolean {

    if(this.BasicInfo.invalid){
      this.formsTab.tabs[0].active = true;
      return false;
    }

    if(this.PriceInfo.invalid){
      this.formsTab.tabs[1].active = true;
      return false;
    }

    if(this.AddressInfo.invalid){
      this.formsTab.tabs[2].active = true;
      return false;
    }

    if(this.OtherInfo.invalid){
      this.formsTab.tabs[3].active = true;
      return false;
    }

    return true;
  }

  onBack() {
    this.router.navigate(['/']);
  }


}
