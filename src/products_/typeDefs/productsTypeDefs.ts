export const productTypesDefs = `
  type Product {
    id: Int
    name: String
    salePrice: String
    quantity: Int
    description: String
    category: String
    discountPercentage: Int
    imageUrl: String
    imageAlt: String
  }

  input ProductToCheck {
    productId: Int
    requiredQuantity: Int
  }
  type InStock {
    productId: Int
    requiredQuantity: Int
  }
  type NotInStock {
    product: Product
    requiredQuantity: Int
  }
  type Response {
    inStock: [InStock]!
    notInStock: [NotInStock]!
  }
`;

export const productsTypeDefsQueries = `
  getProducts: [Product]
  getProduct(id:ID): Product

`;

export const productsTypeDefsMutation = `
  checkProductsInStock(cart:[ProductToCheck!]): Response
  cancelProductsInStock(cart:[ProductToCheck!]): String!

`;
