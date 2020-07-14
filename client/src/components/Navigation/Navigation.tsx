import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import { getProductsInCartNumber } from "../../helpers/getProductsInCartNumber";
import { CurrencyDropdown } from "../CurrencyDropdown/CurrencyDropdown";
import { ReactComponent as BasketIcon } from "./assets/basketIcon.svg";
import style from "./Navigation.module.css";

export function Navigation() {
  const { isAuthorised } = useAuth();
  const { cart } = useCart();

  return (
    <div className={style["navigation"]}>
      <div className={style["navigation-inner"]}>
        <Link to="/" className={style["navigation-logo"]}>
          PIZZA
        </Link>
        <Link to="/" className={style["navigation-link"]}>
          menu
        </Link>
        {isAuthorised ? (
          <Link to="/user" className={style["navigation-link"]}>
            user
          </Link>
        ) : (
          <Link to="/login" className={style["navigation-link"]}>
            login
          </Link>
        )}
        <CurrencyDropdown />
        <Link to="/cart" className={style["navigation-cart"]}>
          <div className={style["navigation-cart-icon-wrapper"]}>
            <BasketIcon className={style["navigation-cart-icon"]} />
            {Object.keys(cart).length > 0 && (
              <span className={style["navigation-cart-counter"]}>
                {getProductsInCartNumber(cart)}
              </span>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
}
