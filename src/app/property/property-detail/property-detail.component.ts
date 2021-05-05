import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/services/housing.service';
//import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
//import {NgxGalleryImage} from '@kolkov/ngx-gallery';
//import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {

  propertyId:number;       //propertyid for current selected property from property list.
  property=new Property();  //object of property class

  //galleryOptions: NgxGalleryOptions[];   //for image gallery
  //galleryImages: NgxGalleryImage[];       //for image gallery


  constructor(private route:ActivatedRoute,
              private router:Router,
              private housingService:HousingService) { }

  ngOnInit() {
    this.propertyId=Number(this.route.snapshot.params['id']);
    this.route.data.subscribe(      //using route resolver service to  redirect to property detail page
      (data:Property)=>{
        this.property = data['prp']
      });


    //this.route.params.subscribe(
    //                  (params) => {
    //                    this.propertyId = Number(params['id']);
    //                    this.housingService.getProperty(this.propertyId)
    //                                        .subscribe( (data : Property) => this.property = data)
    //                  });


  }
}
