import orderService from "../services/order.service";
import { RequestHandler } from "express";

const getOrders: RequestHandler = async (req, res) => {
  const orders = await orderService.getOrders(req.user.id);
  res.send({ orders });
};

const getOrder: RequestHandler = async (req, res) => {
  const order = await orderService.getOrderById(req.params.id);
  res.send({ order });
};

const createOrder: RequestHandler = async (req, res) => {
  if (req.user !== undefined) {
    await orderService.createOrder({ ...req.body, userId: req.user.id });
  } else {
    await orderService.createOrder({ ...req.body });
  }
  res.sendStatus(200);
};

export default {
  getOrders,
  getOrder,
  createOrder,
};
