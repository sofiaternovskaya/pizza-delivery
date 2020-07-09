import deliveryService from "../services/delivery.service";
import { RequestHandler } from "express";

const getDelivery: RequestHandler = async (req, res) => {
  const delivery = await deliveryService.getDelivery();
  res.send({ delivery });
};

export default {
  getDelivery,
};
