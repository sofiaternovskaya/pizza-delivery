import React from "react";
import { ReactComponent as PizzaIcon } from "./assets/pizza.svg";
import style from "./CartSuccessfullOrder.module.css";

export function CartSuccessfullOrder() {
  return (
    <div className={style["cart-successfull-order"]}>
      <div className={style["cart-successfull-order-text"]}>
        Thank you for your order!
      </div>
      <div className={style["cart-successfull-order-text"]}>
        It's coming soon!
      </div>
      <PizzaIcon className={style["cart-successfull-order-icon"]} />
    </div>
  );
}
