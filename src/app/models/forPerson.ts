import {Default} from "./default";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

export interface ForPerson {
  date?: NgbDateStruct;
  trDate?: string;
  receiverPerson?:number;
  selectedPerson?: Default;
  roomId?: number;
  selectedRoom?: Default;
  list?: Array<any>;
  listData?: Array<any>;
  fromStock?: number;
  addon?: number;
  generator?: boolean;
  note?: string;
  files?: any;
}
