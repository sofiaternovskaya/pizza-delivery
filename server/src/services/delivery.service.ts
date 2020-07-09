import { getRepository } from "typeorm";
import { Delivery } from "../entities/delivery/delivery.entity";

const getDelivery = async () => {
  return await getRepository(Delivery).find();
};

export default {
  getDelivery,
};
