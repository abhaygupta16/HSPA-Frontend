import { Injectable } from '@angular/core';
import * as Alertify from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

constructor() { }

  success(message:string){
    Alertify.success(message);
  }

  warning(message:string){
    Alertify.warning(message);
  }

  error(message:string){
    Alertify.error(message);
  }
}
