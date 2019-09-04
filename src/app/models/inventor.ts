import {Default} from "./default";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

export interface Inventor {
  vin?: any,
  isCar?: number,
  id?: number,
  selectedMeasureUnitName?: Default
  date?: NgbDateStruct,
  inCart?: boolean,
  entryDate?: string,
  name?: string,
  fullname?: any,
  selectedName?: any;
  selectedMaker?: Default,
  maker?: any,
  selectedModel?: Default,
  model?: any,
  price?: number,
  inStock?: number,
  selectedBarcode?: {id?: number, name?: string, length?: number, startPoint?: number, value?: string},
  barCodeType?: number,
  barCode?: string,
  fullBarCode?: string,
  amount?: number,
  itemNumber?: number,
  factoryNumber?: string,
  selectedSupplier?: Default,
  supplier?: number,
  invoice?: string,
  invoiceAddon?: string,
  measureUnitName?: string,
  measureUnit?: number,
  selectedItemType?: Default,
  itemType?: number,
  selectedItemStatus?: Default,
  itemStatus?: number,
  inspectionNumber?:string;
  itemGroupName?: string
  itemGroup?:number,
  spend?: number,
  note?: string,
  packageAmount?: number,
  list?: [{"barCode":string,"serialNumber":string,"amount":number}],
  consumption?: boolean,
  tmpAmount?: number,
  showAmount?: number,
}
