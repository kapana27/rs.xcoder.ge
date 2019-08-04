import {Default} from "./default";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

export interface TransferToSection {
  date?: NgbDateStruct;
  trDate?: string;
  toStock?: number;
  toWhomStock?: number;
  carrierPerson?: number;
  carrierPersonDetails?: any;
  note?: string;
  list?: Array<any>;
  listData?: Array<any>;
  fromStock?: number;
  addon?: number;
  personName?: string;
  information?: string;
  fromDetails?: Default;
  toWhomStockDetails?:any;
  files?: any;
}
