import {
  cancelProductsInStock,
  checkProductsInStock,
  getProduct,
  getProducts,
} from "../services/productsServices";

export const productsQueries = {
  getProducts,
  getProduct,
};
export const productsMutations = {
  checkProductsInStock,
  cancelProductsInStock,
};
