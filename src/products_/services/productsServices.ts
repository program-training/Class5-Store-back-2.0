import {
  getProductsFromDB,
  getProductByIdFromDB,
  checkStockInDB,
  cancelProductsInOrderInDB,
} from "../dal/productsDal";

import { CheckQuantity } from "../types/types";

export const getProducts = async () => {
  try {
    const products = await getProductsFromDB();
    return products;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    return null;
  }
};

export const getProduct = async (_: unknown, { id }: { id: String }) => {
  try {
    const product = await getProductByIdFromDB(id as string);
    return product;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    return null;
  }
};
type productToCheck = {
  productId: number;
  requiredQuantity: number;
};

export const checkProductsInStock = async (
  _: any,
  { cart }: { cart: productToCheck[] }
) => {
  try {
    const result = await checkStockInDB(cart);
    return result;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    return null;
  }
};
export const cancelProductsInStock = async (
  _: any,
  { cart }: { cart: CheckQuantity[] }
) => {
  try {
    const product = await cancelProductsInOrderInDB(cart);
    return product;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    return null;
  }
};
