import React, { useState } from "react";
import useSWR from "swr";
import useCart from "../../hooks/useCart";
import { useFetcher } from "../../hooks/useFetcher";
import useCurrency from "../../hooks/useCurrency";
import { getCartPrice } from "../../helpers/getPrice";
import { Loader } from "../../components/Loader/Loader";
import { CurrentCurrencyIcon } from "../../components/CurrentCurrencyIcon/CurrentCurrencyIcon";
import { CreateOrderForm } from "../../components/CreateOrderForm/CreateOrderForm";
import { CatalogItem } from "../../components/CatalogItem/CatalogItem";
import { Title } from "../../components/Title/Title";
import { CartSuccessfullOrder } from "./CartSuccessfullOrder/CartSuccessfullOrder";
import { TProductsData, TDelivery } from "../../types";
import style from "./Cart.module.css";

type TDeliveryData = {
  delivery: TDelivery[];
};

type TInputs = {
  name: string;
  address: string;
  phone: string;
};

export function Cart() {
  const { cart, clearCart } = useCart();
  const fetcher = useFetcher();
  const { currency } = useCurrency();

  const [isSuccessfullOrder, serIsSuccessfullOrder] = useState(false);
  const [serverError, setServerError] = useState(false);

  const urlGetProducts = `/product?ids=${Object.keys(cart).join("=")}`;

  const { data: dataProducts, error: dataProductsError } = useSWR<
    TProductsData
  >(urlGetProducts);
  const { data: dataDelivery, error: dataDeliveryError } = useSWR<
    TDeliveryData
  >("/delivery");

  const onSubmit = async (data: TInputs) => {
    const order = {
      ...data,
      orders: Object.entries(cart).map(([key, value]) => ({
        id: key,
        quantity: value,
      })),
    };

    try {
      await fetcher("/order/create_order", {
        method: "POST",
        body: JSON.stringify(order),
      });

      clearCart();
      serIsSuccessfullOrder(true);
    } catch (err) {
      setServerError(true);
    }
  };

  if (dataProductsError || dataDeliveryError)
    return (
      <div className={style["cart-error"]}>
        Something went wrong, please try again
      </div>
    );

  if (dataProducts && dataDelivery) {
    const delivery = dataDelivery.delivery[0];
    const products = dataProducts.products;

    return (
      <div className={style["cart"]}>
        {products.length > 0 ? (
          <>
            <Title size="second" text="Your order" />
            <div className={style["cart-list"]}>
              {products.map((item) => (
                <CatalogItem key={item.id} {...item} isRow={true} />
              ))}

              <div className={style["cart-info"]}>
                <span className={style["cart-info-title"]}>Delivery: </span>
                {currency === "usd"
                  ? delivery.delivery_usd
                  : delivery.delivery_eur}{" "}
                <CurrentCurrencyIcon />
              </div>
              <div>
                <span className={style["cart-info-title"]}>Total price: </span>
                {getCartPrice(products, cart, currency, delivery)}{" "}
                <CurrentCurrencyIcon />
              </div>
            </div>

            <CreateOrderForm onSubmit={onSubmit} serverError={serverError} />
          </>
        ) : (
          <>
            {isSuccessfullOrder && <CartSuccessfullOrder />}
            {!isSuccessfullOrder && <div>Your cart is empty</div>}
          </>
        )}
      </div>
    );
  }

  return (
    <div className={style["cart-loader"]}>
      <Loader />
    </div>
  );
}
