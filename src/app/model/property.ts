import { Ipropertybase } from "./ipropertybase";

export class Property implements Ipropertybase {
  Id: number;
  SellRent: number;
  Name: string;
  PType: string;              //Property Type
  BHK: number;
  FType: string;              //furnish type
  Price: number;
  BuiltArea: number;
  CarpetArea?: number;
  Address: string;
  Address2?: string;
  City: string;
  FloorNo?: string;
  TotalFloor?: string;
  RTM: number;                //Ready to Move
  AOP?: string;               //age of property
  MainEntrance?: string;
  Security?: number;
  Gated?: number;
  Maintenance?: number;
  Possession?: string;
  Image?: string;
  Description?: string;
  PostedOn: string;           //current date at which it was added
  PostedBy: number;

}
