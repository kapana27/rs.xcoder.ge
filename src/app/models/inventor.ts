import {Default} from "./default";

export interface Inventor {
  selectedMeasureUnitName?: Default;
  date?: Date,
  entryDate?: string,
  name?: string,
  fullname?: string,
  selectedMaker?: Default,
  maker?: number,
  selectedModel?: Default,
  model?: number,
  price?: number,
  selectedBarcode?: Default,
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
  inspectionNumber?:number;
  itemGroupName?: string
  itemGroup?:number,
  spend?: number,
  note?: string,
  packageAmount?: number,
  list?: [{"barCode":string,"serialNumber":string,"amount":number}],
  consumption?: boolean
}
