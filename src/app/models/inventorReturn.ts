import {Default} from "./default";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

export interface InventorReturn {
  inventarReturnGenerator: boolean;
  date?: NgbDateStruct;
  note?: string;
  trDate?: string;
  selectedCarrier?: Default;
  selectedProperty?: Default;
  selectedSection?: Default;
  inventorReturnModel?: number;
  addon?: number;
  carrierPerson?: number;
  listData?: Array<any>;
  list?: Array<any>;
  toWhomStock?: number;
  toStock?: number;
  files?: any;
}
