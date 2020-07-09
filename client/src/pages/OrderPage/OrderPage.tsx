import React from "react";
import { RouteComponentProps } from "react-router-dom";
import useCurrency from "../../hooks/useCurrency";
import { getOrderPrice } from "../../helpers/getPrice";
import { getFormatedDate } from "../../helpers/getFormatedDate";
import { Layout } from "../../components/Layout/Layout";
import { CatalogItem } from "../../components/CatalogItem/CatalogItem";
import { Title } from "../../components/Title/Title";
import { OrderPageInfo } from "./OrderPageInfo/OrderPageInfo";
import { CurrentCurrencyIcon } from "../../components/CurrentCurrencyIcon/CurrentCurrencyIcon";
import { TOrder } from "../../types";
import style from "./OrderPage.module.css";

type TDate<T> = {
  order: T;
};

export function OrderPage(props: RouteComponentProps<{ orderId: string }>) {
  const { currency } = useCurrency();

  return (
    <Layout<TDate<TOrder>> url={`/order/${props.match.params.orderId}`}>
      {(data) => {
        const {
          delivery_eur,
          delivery_usd,
          order_date,
          order_items,
          user_address,
        } = data.order;

        return (
          <div className={style["order-page"]}>
            <h2 className={style["order-page-title"]}>Your order</h2>
            <OrderPageInfo title="Ordered to:" value={user_address} />
            <OrderPageInfo title="Date:" value={getFormatedDate(order_date)} />
            <OrderPageInfo title="Delivery price:">
              {currency === "usd" ? delivery_usd : delivery_eur}{" "}
              <CurrentCurrencyIcon />
            </OrderPageInfo>

            <OrderPageInfo title="Total price:">
              {getOrderPrice(order_items, currency, [
                data.order.delivery_usd,
                data.order.delivery_eur,
              ])}{" "}
              <CurrentCurrencyIcon />
            </OrderPageInfo>

            <Title size="third" text={`Order items:`} />
            {order_items.map((item) => (
              <CatalogItem
                key={item.product[0].id}
                {...item.product[0]}
                quantity={item.quantity}
                isRow={true}
                isOrder={true}
              />
            ))}
          </div>
        );
      }}
    </Layout>
  );
}
