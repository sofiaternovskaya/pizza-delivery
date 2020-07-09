import React from "react";
import useCart from "../../hooks/useCart";
import { ReactComponent as MinusIcon } from "./assets/minusIcon.svg";
import { ReactComponent as PlusIcon } from "./assets/plusIcon.svg";
import styles from "./ButtonAddProduct.module.css";

type TProps = {
  id: string;
  ligth?: boolean;
  customClassName?: string;
};

export function ButtonAddProduct({ id, ligth, customClassName }: TProps) {
  const cart = useCart();

  const isEmpty = cart.cart[id] > 0 ? "" : styles["button-add-product-empty"];
  const isLigth = ligth ? styles["button-add-product-light"] : "";
  const propsClassName = customClassName ? styles[customClassName] : "";

  return (
    <div
      className={`${styles["button-add-product"]} ${isEmpty} ${isLigth} ${propsClassName}`}
    >
      <div
        onClick={() => cart.removeProductFromCart(id)}
        className={styles["button-add-product-icon-wrapper"]}
      >
        <MinusIcon className={styles["button-add-product-icon"]} />
      </div>
      <div className={styles["button-add-product-number"]}>{cart.cart[id]}</div>
      <div
        onClick={() => cart.addProductToCart(id)}
        className={styles["button-add-product-icon-wrapper"]}
      >
        <PlusIcon className={styles["button-add-product-icon"]} />
      </div>
    </div>
  );
}
