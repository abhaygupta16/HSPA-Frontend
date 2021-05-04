import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { Ipropertybase } from '../model/ipropertybase';
import { Property } from '../model/property';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http:HttpClient) { }

  //TO get Property Detail of single property
  getProperty(id : number){
    return this.getAllProperties().pipe(
      map(propertiesArray =>{
        return propertiesArray.find(p => p.Id === id);
      })
    )
  }

  /*
  Get all property method will merge the data from json file as well as the local storage into one
  common array to get a standard data format of array type
  */
  getAllProperties(SellRent ?: number):Observable<Ipropertybase[]>{
    return this.http.get("data/properties.json")
                  .pipe(
                    map(data => {
                        const propertiesArray:Array<Ipropertybase>=[];

                        const localStorageProperties=JSON.parse(localStorage.getItem('newProp'));

                        //this will push the data from local storage into the common array
                        if(localStorageProperties){
                          for(const id in localStorageProperties){
                            if(SellRent){
                              if(localStorageProperties.hasOwnProperty(id) && localStorageProperties[id].SellRent===SellRent){
                                propertiesArray.push(localStorageProperties[id]);
                              }
                            }else{
                              propertiesArray.push(localStorageProperties[id]);
                            }
                          }
                        }

                        // this will push the data from json file ito coomon array
                        for(const id in data){
                          if(SellRent){
                            if(data.hasOwnProperty(id) && data[id].SellRent===SellRent){
                              propertiesArray.push(data[id]);
                            }
                          }else{
                            propertiesArray.push(data[id]);
                          }
                        }
                      return propertiesArray;
                      })
                  );
  }


  //Add new property to the local storage
  addProperty(property:Property){
    let newPropArray=[property];

    //Add new property from property list form into array if it already existe in local storage
    if(localStorage.getItem('newProp')){
      let properties=JSON.parse(localStorage.getItem('newProp'));
      newPropArray = [...properties,property]
    }
    localStorage.setItem('newProp', JSON.stringify(newPropArray));
  }

  //Add a function to generate PropoertId Automatically
  newPropId(){
    if(localStorage.getItem('PID')){
      localStorage.setItem('PID', String(+localStorage.getItem('PID') + 1));  //adding 1 to Pid and converting again to string as local stoarage stores in json format.
      return +localStorage.getItem('PID');     //converting string again to number to assign it to the propId of property
    }else{
      localStorage.setItem('PID' ,'101');
      return 101;
    }
  }
}
