import {Default} from "./default";

export interface ForPerson {
  date?: Date;
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
}
