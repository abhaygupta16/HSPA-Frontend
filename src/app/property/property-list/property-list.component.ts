import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from 'src/app/services/housing.service';
import { IProperty } from '../IProperty';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {

  SellRent:number=1;

  properties: Array<IProperty> ;

  constructor( private route: ActivatedRoute,private housingService : HousingService) { }

  ngOnInit() {
    if(this.route.snapshot.url.toString()){
      this.SellRent=2;    // Assign to rent property else it will be buy property.
    }

    this.housingService.getAllProperties(this.SellRent)
                        .subscribe(data => this.properties=data,error => console.log(error))
  }

}
