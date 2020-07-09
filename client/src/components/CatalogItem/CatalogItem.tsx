import React from "react";
import { Link } from "react-router-dom";
import useCurrency from "../../hooks/useCurrency";
import { ButtonAddProduct } from "../ButtonAddProduct/ButtonAddProduct";
import { CurrentCurrencyIcon } from "../CurrentCurrencyIcon/CurrentCurrencyIcon";
import styles from "./CatalogItem.module.css";

type TProps = {
  id: string;
  name: string;
  src: string;
  price_usd: number;
  price_eur: number;
  quantity?: number;
  isRow?: boolean;
  isOrder?: boolean;
};

export function CatalogItem({
  id,
  name,
  src,
  price_usd,
  price_eur,
  quantity,
  isRow,
  isOrder,
}: TProps) {
  const { currency } = useCurrency();

  const rowClass = isRow ? styles["catalog-item-row"] : "";

  const fullLinkClass = isOrder ? styles["catalog-item-full-link"] : "";

  return (
    <div className={`${styles["catalog-item"]} ${rowClass} ${fullLinkClass}`}>
      <div className={styles["catalog-item-img-wrapper"]}>
        <img src={src} alt={name} className={styles["catalog-item-img"]} />
        {!isOrder && (
          <Link
            to={`/product/${id}`}
            className={styles["catalog-item-link"]}
          ></Link>
        )}
      </div>
      <div className={styles["catalog-item-description"]}>
        <div className={styles["catalog-item-name-wrapper"]}>
          <div className={styles["catalog-item-name"]}>{name}</div>
          {!isOrder && <ButtonAddProduct id={id} />}
          {isOrder && (
            <div className={styles["catalog-item-quantity"]}>x {quantity}</div>
          )}
        </div>
        <div className={styles["catalog-item-description-price-wrapper"]}>
          <div className={styles["catalog-item-price"]}>
            {currency === "usd" ? price_usd : price_eur} <CurrentCurrencyIcon />
          </div>
        </div>
        {isOrder && (
          <Link
            to={`/product/${id}`}
            className={styles["catalog-item-link"]}
          ></Link>
        )}
      </div>
    </div>
  );
}
