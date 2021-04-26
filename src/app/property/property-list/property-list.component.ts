import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {

  properties: any =[
    {
      "Id":1,
      "Name":"Birla House",
      "Type":"House",
      "Price":12000
    },
    {
      "Id":2,
      "Name":"Tata House",
      "Type":"House",
      "Price":14000
    },
    {
      "Id":3,
      "Name":"Ambani House",
      "Type":"House",
      "Price":24000
    },
    {
      "Id":4,
      "Name":"Adani House",
      "Type":"House",
      "Price":18000
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
