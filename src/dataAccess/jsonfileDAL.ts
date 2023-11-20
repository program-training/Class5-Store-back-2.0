import jsonfile from "jsonfile";
import path from "path";
import { handleJsonfileError } from "../utils/handleErrors";

const DB_URL = path.join(__dirname, "../../DB/products.json");

type Product = {
  _id: string;
  name: string;
  salePrice: number;
  quantity: number;
  description: string;
  category: string;
  discountPercentage: number;
  image: {
    url: string;
    alt: string;
  };
  isForSale: boolean;
  costPrice: number;
  supplier: string;
};

//פונקציה שמקבלת מוצרים מתוך הjson file ומעבירה הלאה
export const getProductsFromJsonFile = async () => {
  try {
    const data = await jsonfile.readFile(DB_URL);
    return data;
  } catch (error) {
    return handleJsonfileError(error);
  }
};

export const getProductByIdFromJsonFile = async (id: string) => {
  try {
    const result = await getProductsFromJsonFile();
    // Find the product by ID
    const products = result.products;
    const product = products.find((p: Product) => p._id === id);
    if (!product) {
      console.log("Product not found");
      throw Error;
    }
    return product;
  } catch (error) {
    console.log(error);
    return handleJsonfileError(error);
  }
};

export const getDatabase = async () => {
  try {
    const data = await jsonfile.readFile(DB_URL);
    return data;
  } catch (error) {
    return handleJsonfileError(error);
  }
};

export const modifyCollection = async (
  collection: string,
  documents: Record<string, unknown>[]
) => {
  try {
    const data = await getDatabase();
    const newData = { ...data, [collection]: documents };
    await jsonfile.writeFile(DB_URL, newData);
    return documents;
  } catch (error) {
    return handleJsonfileError(error);
  }
};
