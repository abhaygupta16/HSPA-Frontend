import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs/public_api';
import { Ipropertybase } from 'src/app/model/ipropertybase';
import { Property } from 'src/app/model/property';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HousingService } from 'src/app/services/housing.service';


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

  property=new Property();

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

  constructor(private fb:FormBuilder,
              private router:Router,
              private housingService:HousingService,
              private alertify:AlertifyService) { }

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
        Possession: [null],
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

    get Possession() {
      return this.OtherInfo.controls.Possession as FormControl;
    }

    get AOP() {
      return this.OtherInfo.controls.AOP as FormControl;
    }

    get Gated() {
      return this.OtherInfo.controls.Gated as FormControl;
    }

    get MainEntrance() {
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
      this.mapProperty();
      this.housingService.addProperty(this.property);
      this.alertify.success('Congrats, your property listed successfully on our website');

      if(this.SellRent.value === '2'){
        this.router.navigate(['/rent-property']);
      }else{
        this.router.navigate(['/']);
      }

      console.log(this.addPropertyForm);
    }else{
      this.alertify.error('Kindly Review all tabs of the form again');
    }
  }

  mapProperty(): void {
    this.property.Id = this.housingService.newPropId();
    this.property.SellRent = +this.SellRent.value;  // '+' converts string into number
    this.property.BHK = this.BHK.value;
    this.property.PType = this.PType.value;
    this.property.Name = this.Name.value;
    this.property.City = this.City.value;
    this.property.FType = this.FType.value;
    this.property.Price = this.Price.value;
    this.property.Security = this.Security.value;
    this.property.Maintenance = this.Maintenance.value;
    this.property.BuiltArea = this.BuiltArea.value;
    this.property.CarpetArea = this.CarpetArea.value;
    this.property.FloorNo = this.FloorNo.value;
    this.property.TotalFloor = this.TotalFloor.value;
    this.property.Address = this.Address.value;
    this.property.Address2 = this.LandMark.value;
    this.property.RTM = this.RTM.value;
    this.property.AOP = this.AOP.value;
    this.property.Gated = this.Gated.value;
    this.property.MainEntrance = this.MainEntrance.value;
    this.property.Possession = this.Possession.value;
    this.property.Description = this.Description.value;
    this.property.PostedOn = new Date().toString();
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
