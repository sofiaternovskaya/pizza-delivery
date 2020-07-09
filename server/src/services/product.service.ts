import { getRepository } from "typeorm";
import { Product } from "../entities/product/product.entity";

const getProducts = async () => {
  return await getRepository(Product).find();
};

const getProductsByIds = async (ProductsIds: string[]) => {
  return await getRepository(Product).findByIds(ProductsIds);
};

const getProductById = async (ProductId: string) => {
  return await getRepository(Product).findOneOrFail({ id: ProductId });
};

export default {
  getProducts,
  getProductsByIds,
  getProductById,
};
