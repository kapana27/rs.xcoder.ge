import {Default} from "./default";

export interface Employee {
  city?: any
  department?: Default
  email?: string
  firstname?: string
  fullname?: string
  id?: number
  lastname?: string
  location?: Default
  role?: {role:string, name:string}
  mobile?: string
  pid?: string
  building?: any
  list?: Array<any>
  dialog?:boolean
  position?: any;
  cityAll?: Default;
  buildingAll?: Default;
  sectionAll?: Default;
}
