import React from "react";
import { Link } from "react-router-dom";
import useCurrency from "../../hooks/useCurrency";
import { getOrderPrice } from "../../helpers/getPrice";
import { CurrentCurrencyIcon } from "../CurrentCurrencyIcon/CurrentCurrencyIcon";
import { TOrderItem } from "../../types";
import style from "./OrderItem.module.css";

type TProps = {
  id: string;
  orderItems: TOrderItem[];
  delivery_usd: number;
  delivery_eur: number;
};

export function OrderItem({
  id,
  orderItems,
  delivery_usd,
  delivery_eur,
}: TProps) {
  const { currency } = useCurrency();

  return (
    <div className={style["order-item"]}>
      <div className={style["order-item-row"]}>
        <span className={style["order-item-row-title"]}>Order №</span>
        {id}
      </div>
      <div className={style["order-item-row"]}>
        <span className={style["order-item-row-title"]}>
          Products in order:
        </span>
        {orderItems.length}
      </div>
      <div className={style["order-item-price"]}>
        {getOrderPrice(orderItems, currency, [delivery_usd, delivery_eur])}{" "}
        <CurrentCurrencyIcon />
      </div>
      <Link key={id} to={`/order/${id}`} className={style["order-item-link"]} />
    </div>
  );
}
