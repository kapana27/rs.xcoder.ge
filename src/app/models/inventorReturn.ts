import {Default} from "./default";

export interface InventorReturn {
  inventarReturnGenerator: boolean;
  date?: Date;
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
}
