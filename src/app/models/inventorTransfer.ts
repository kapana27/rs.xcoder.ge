import {Default} from "./default";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

export interface InventorTransfer {
  date?: NgbDateStruct;
  trDate?: string;
  selectedProperty?: Default;
  selectedPerson?: Default;
  selectedCarrier?: Default;
  selectedSection?: Default;
  note?: string;
  fromStock?: number;
  listData?: Array<any>;
  carrierPerson?: number;
  toWhomSection?: number;
  requestPerson?: number;
  list?: Array<any>;
  selectedIndex?: number;
  generator?: boolean;
  addon?: number,
  roomId?: number,
  receiverPerson?: number,
  selectedRequestPerson?:number,
  files?:any
}
