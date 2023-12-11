import ProductInterface from "../interfaces/productInterface";

export type productToCheck = {
  product: ProductInterface;
  requiredQuantity: number;
  sumProductInCart: number;
};

export const convertToCheck = (cart: productToCheck[]) => {
  return cart.map((item) => {
    return {
      productId: item.product.id,
      requiredQuantity: item.requiredQuantity,
    };
  });
};
