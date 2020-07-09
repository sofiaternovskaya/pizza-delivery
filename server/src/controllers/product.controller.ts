import { RequestHandler } from "express";

import productService from "../services/product.service";

const getProducts: RequestHandler = async (req, res) => {
  let products;
  if (Object.keys(req.query).length === 0) {
    products = await productService.getProducts();
  } else {
    products = await productService.getProductsByIds(req.query.ids.split("="));
  }
  res.send({ products });
};

const getProduct: RequestHandler = async (req, res) => {
  const product = await productService.getProductById(req.params.id);
  res.send({ product });
};

export default {
  getProducts,
  getProduct,
};
