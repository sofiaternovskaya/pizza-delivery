import { getRepository } from "typeorm";
import { User } from "../entities/user/user.entity";
import { Order } from "../entities/order/order.entity";
import { OrderItem } from "../entities/order/order_item.entity";
import { Product } from "../entities/product/product.entity";
import { Delivery } from "../entities/delivery/delivery.entity";

const createOrder = async (
  name: string,
  phoneNumber: string,
  address: string,
  productItems: { id: string; quantity: number }[],
  userId: string
) => {
  const newOrder = new Order();
  [newOrder.user_name, newOrder.user_phone_number, newOrder.user_address] = [
    name,
    phoneNumber,
    address,
  ];
  const deliveryPrice = await getRepository(Delivery).findOne();
  newOrder.delivery_usd = deliveryPrice.delivery_usd;
  newOrder.delivery_eur = deliveryPrice.delivery_eur;
  newOrder.user = { id: userId } as User;
  const productPrices = await getRepository(Product).findByIds(
    productItems.map(item => item.id),
    {
      select: ["id", "price_usd", "price_eur"],
    }
  );
  newOrder.order_items = productItems.map(({ id, quantity }) => {
    const newOrderItem = new OrderItem();
    newOrderItem.product = [{ id } as Product];
    newOrderItem.quantity = quantity;
    newOrderItem.price_usd = productPrices.find(
      item => item.id === id
    ).price_usd;
    newOrderItem.price_eur = productPrices.find(
      item => item.id === id
    ).price_eur;

    return newOrderItem;
  });

  return await getRepository(Order).save(newOrder);
};

const getOrders = async (userId: string) => {
  return await getRepository(Order)
    .createQueryBuilder("order")
    .orderBy("order.order_date", "DESC")
    .leftJoinAndSelect("order.order_items", "items")
    .leftJoinAndSelect("items.product", "product")
    .where("order.user=:user_id", { user_id: userId })
    .getMany();
};

const getOrderById = async (orderId: string) => {
  return await getRepository(Order)
    .createQueryBuilder("order")
    .leftJoinAndSelect("order.order_items", "items")
    .leftJoinAndSelect("items.product", "product")
    .where("order.id=:order_id", { order_id: orderId })
    .getOne();
};

export default {
  createOrder,
  getOrders,
  getOrderById,
};
