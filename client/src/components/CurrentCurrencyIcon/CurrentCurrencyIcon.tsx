import React from "react";
import { currencyMap } from "../../constants";
import useCurrency from "../../hooks/useCurrency";

export function CurrentCurrencyIcon() {
  const { currency } = useCurrency();

  return <span className="CurrentCurrencyIcon">{currencyMap[currency]}</span>;
}
