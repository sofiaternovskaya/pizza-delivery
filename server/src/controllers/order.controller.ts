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
  await orderService.createOrder(
    req.body.name,
    req.body.phone,
    req.body.address,
    req.body.orders,
    req.user.id
  );
  res.sendStatus(200);
};

export default {
  getOrders,
  getOrder,
  createOrder,
};
