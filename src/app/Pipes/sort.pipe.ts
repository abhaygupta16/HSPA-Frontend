import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: Array<string>, args: any[]): any {

    const sortField = args[0];        //field that will help in sorting
    const sortDirection = args[1];    //feild to set direction of sort (asc or desc)
    let multiplier = 1;             //used to reverse the sort value in case direction is desc

    if(sortDirection === 'desc'){
      multiplier = -1;
    }

    //by default the sort method of array returns in asc order
    value.sort((a: any,b: any) => {

      if(a[sortField] < b[sortField]){
        return -1 * multiplier;
      }else if(a[sortField] > b[sortField]){
        return 1 * multiplier;
      }else{
        return 0;
      }

    });

    return value;
  }

}
