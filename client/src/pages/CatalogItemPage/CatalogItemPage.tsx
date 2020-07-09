import React from "react";
import useCurrency from "../../hooks/useCurrency";
import { RouteComponentProps } from "react-router-dom";
import { Layout } from "../../components/Layout/Layout";
import { ButtonAddProduct } from "../../components/ButtonAddProduct/ButtonAddProduct";
import { TProduct } from "../../types";
import style from "./CatalogItemPage.module.css";
import { Title } from "../../components/Title/Title";
import { CurrentCurrencyIcon } from "../../components/CurrentCurrencyIcon/CurrentCurrencyIcon";

type TProductData = {
  product: TProduct;
};

export function CatalogItemPage(
  props: RouteComponentProps<{ productId: string }>
) {
  const { currency } = useCurrency();

  return (
    <Layout<TProductData> url={`/product/${props.match.params.productId}`}>
      {({ product }) => (
        <div className={style["catalog-item-page"]}>
          <div className={style["catalog-item-page-img-wrapper"]}>
            <img
              src={product.src}
              alt={product.name}
              className={style["catalog-item-page-img"]}
            />
            <div className={style["catalog-item-page-name-wrapper"]}>
              <Title size="first" text={product.name} light={true} />
              <p className={style["catalog-item-page-price"]}>
                {currency === "usd" ? product.price_usd : product.price_eur}{" "}
                <CurrentCurrencyIcon />
              </p>
            </div>
          </div>

          <ButtonAddProduct
            id={props.match.params.productId}
            ligth={true}
            customClassName="catalog-item-page-button"
          />

          <p className={style["catalog-item-page-description"]}>
            {product.description}
          </p>
        </div>
      )}
    </Layout>
  );
}
