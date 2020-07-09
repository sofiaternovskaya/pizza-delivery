import { TOrderItem, TProduct, TCurrency, TDelivery } from "../types";

function getDeliveryCost(
  delivery: { delivery_usd: number; delivery_eur: number },
  currency: TCurrency
) {
  return currency === "usd" ? delivery.delivery_usd : delivery.delivery_eur;
}

export function getOrderPrice(
  orderItems: TOrderItem[],
  currency: TCurrency,
  delivery: number[]
) {
  const priceKey = currency === "usd" ? "price_usd" : "price_eur";
  const [delivery_usd, delivery_eur] = delivery;
  const deliveryCost = getDeliveryCost(
    { delivery_usd, delivery_eur },
    currency
  );

  return (
    orderItems.reduce(
      (price, item) => (price += item[priceKey] * item.quantity),
      0
    ) + deliveryCost
  );
}

export function getCartPrice(
  products: TProduct[],
  cart: { [key: string]: number },
  currency: TCurrency,
  delivery: TDelivery
) {
  const priceKey = currency === "usd" ? "price_usd" : "price_eur";
  const { id, ...deliveryPrice } = delivery;
  const deliveryCost = getDeliveryCost(deliveryPrice, currency);

  return (
    products.reduce(
      (price, item) => (price += item[priceKey] * cart[item.id]),
      0
    ) + deliveryCost
  );
}
