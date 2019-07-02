export interface Item
{
  inCart?: boolean,
  inStock?: number,
  "id"?: number,
  "entryDate"?: string,
  "name"?: string,
  "maker"?: {
    "id": number,
    "name": string
  },
  "model"?: {
    "id": number,
    "name": string
  },
  "itemGroup"?: {
    "id": number,
    "parent": number,
    "name": string,
    "spend": number,
    "nodeSpend": number
  },
  "price"?: number,
  "amount"?: number,
  "itemType"?: {
    "id": number,
    "name": string
  },
  "barcode"?: string,
  "barCodeType"?: {
    "id": number,
    "length": number,
    "startPoint": number,
    "value": string
  },
  "supplier"?: {
    "id": number,
    "name": string
  },
  "measureUnit"?: {
    "id": number,
    "name": string,
    "parent": number,
    "measure_value": number
  },
  "itemStatus"?: {
    "id": number,
    "name": string
  },
  "stock"?: {
    "id": number
  },
  "inspectionNumber"?: string,
  "selected"?: number,
  "tmpAmount"?: number,
  "invoice"?: string,
  "invoiceAddon"?: string
}

