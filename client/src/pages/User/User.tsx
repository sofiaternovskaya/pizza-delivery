import React from "react";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import useSWR from "swr";
import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";
import { PrimaryButton } from "../../components/PrimaryButton/PrimaryButton";
import { OrderItem } from "../../components/OrderItem/OrderItem";
import { Title } from "../../components/Title/Title";
import { Loader } from "../../components/Loader/Loader";
import { TOrder } from "../../types";
import style from "./User.module.css";

type TUser = {
  data: {
    createdAt: string;
    updatedAt: string;
    id: string;
    email: string;
    name: string;
    lastLogin: string;
    isActive: string;
  };
  success: string;
};

type TOrders = {
  orders: TOrder[];
};

export function User() {
  const { clearCart } = useCart();
  const { clearAuth } = useAuth();

  let history = useHistory();

  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const { data: dataUser, error: dataError } = useSWR<TUser, any>(
    "/user/auth/me"
  );

  const { data: dataOrders, error: errorOrders } = useSWR<TOrders>("/order");

  const logOut = () => {
    removeCookie("user");
    clearAuth();
    clearCart();
    history.push("/login");
  };

  if (dataError) {
    return (
      <div className={`${style["user"]} ${style["user-center"]}`}>
        {dataError.message}
      </div>
    );
  }

  if (dataUser) {
    return (
      <div className={style["user"]}>
        <Title size="second" text="Your profile" />
        <div className={style["user-info"]}>
          <span className={style["user-info-row-name"]}>Name:</span>
          {dataUser.data.name}
        </div>
        <div className={style["user-info"]}>
          <span className={style["user-info-row-name"]}>Email:</span>
          {dataUser.data.email}
        </div>
        <PrimaryButton
          type="button"
          onClick={logOut}
          text="Log out"
          propClass="user-button"
        />
        {errorOrders && <div>Error in orders, try to reload a page</div>}
        <Title size="third" text="Your order history" />
        <div className={style["user-orders"]}>
          {dataOrders?.orders.length === 0 && (
            <span>You haven't made any orders yet</span>
          )}
          {dataOrders?.orders.map((item) => (
            <OrderItem key={item.id} orderItems={item.order_items} {...item} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`${style["user"]} ${style["user-center"]}`}>
      <Loader />
    </div>
  );
}
