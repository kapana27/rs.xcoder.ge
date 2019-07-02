export interface Inventory {
  entryDate?: string,
  name?: string,
  maker?: number,
  model?: number,
  price?: number,
  barCodeType?: number,
  barCode?: string,
  amount?: number,
  itemNumber?: number,
  factoryNumber?: string,
  supplier?: number,
  invoice?: string,
  invoiceAddon?: string,
  measureUnitName?: string,
  measureUnit?: number,
  itemType?: number,
  itemStatus?: number,
  inspectionNumber?: string,
  itemGroupName?: string,
  itemGroup?: number,
  spend?: number,
  note?: string,
  list?: Array<{barCode: string,serialNumber:string,amount: number}>
}