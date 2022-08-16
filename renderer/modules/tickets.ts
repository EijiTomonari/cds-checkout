import { DocumentData } from "@firebase/firestore";

export interface TicketItem {
  name: string;
  price: number;
  code?: string;
  weight?: number;
  cantDelete?: boolean;
}

/**
 * It takes an array of numbers, an array of objects and an object and returns an array of objects.
 *
 * The function is used to process data from a ticket scanner. The ticket scanner scans a ticket and
 * returns an array of numbers. The array of numbers represents the number of times a product was
 * scanned. The array of objects represents the products that can be scanned. The object represents the
 * ticket model.
 *
 * The function is used to process the data from the ticket scanner and return an array of objects that
 * represents the products that were scanned.
 *
 * @param scannedProducts - Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
 * 0, 0, 0, 0, 0, 0, 0, 0,
 * @param {DocumentData[]} omrProductsList - DocumentData[] = [
 * @param {DocumentData} ticketModel - DocumentData = {
 * @returns An array of objects.
 */
export const processOMRData = (
  scannedProducts: Array<number>,
  omrProductsList: DocumentData[],
  ticketModel: DocumentData
) => {
  if (scannedProducts.every((product) => product === 0)) {
    return;
  } else {
    try {
      let processedItems = [];
      for (let i = 0; i < scannedProducts.length; i++) {
        if (scannedProducts[i] == 0) {
          continue;
        }
        let item = { name: "", price: 0 };
        const searchResult = omrProductsList.find(
          (product) => product.code == ticketModel.items[i]
        );
        item.name = searchResult.name;
        item.price = searchResult.price;
        for (let index = 0; index < scannedProducts[i]; index++) {
          processedItems.push(item);
        }
      }
      return processedItems;
    } catch (error) {
      console.error(error);
    }
  }
};

export const processBarCodesData = (
  barcodes: Array<string>,
  productsList: DocumentData[],
  quantity: number
) => {
  let processedItems = [];
  const mealResult = productsList.find((product) => product.code == "refeicao");
  barcodes.reverse().forEach((barcode) => {
    if (barcode.slice(0, 8) == "20000000") {
      processedItems.push(processMeal(barcode, mealResult));
    } else {
      const searchResult = productsList.find(
        (product) => product.code == barcode
      );
      if (searchResult) {
        for (let i = 0; i < quantity; i++) {
          processedItems.push(searchResult);
        }
      } else {
        let unknownItem = {
          name: "Item desconhecido",
          price: 0,
          code: barcode,
        };
        processedItems.push(unknownItem);
      }
    }
  });
  return processedItems;
};

const processMeal = (barcode: string, productInfo: any) => {
  let item = { name: "Refeição", price: 0, weight: 0 };
  const quantityString = barcode.slice(-5, -1);
  const quantity = parseInt(quantityString) / 1000;
  item.weight = quantity;
  item.price = Math.round(quantity * productInfo.price * 100) / 100;
  return item;
};

/**
 * It returns the index of the first item in the array that has the name "Item desconhecido" or -1 if
 * no such item exists
 * @param {TicketItem[]} items - TicketItem[]
 * @returns The index of the item in the array.
 */
export const scanForUnknownProduct = (items: TicketItem[]) => {
  let index = items.findIndex((item) => item.name == "Item desconhecido");
  if (index > -1) {
    return index;
  } else {
    return -1;
  }
};
