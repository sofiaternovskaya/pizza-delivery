import { Dispatch, SetStateAction } from "react";
import createPersistedState from "./usePersistedState";
import { TCurrency } from "../types";

const useCurrencyState = createPersistedState("currency") as (
  initialState: TCurrency
) => [TCurrency, Dispatch<SetStateAction<TCurrency>>];

const useCurrency = (initialState: TCurrency = "usd") => {
  const [currency, setCurrency] = useCurrencyState(initialState);

  return {
    currency,
    toggleCurrency: (newCurrency: TCurrency) =>
      setCurrency(() => {
        return newCurrency;
      }),
    clearCurrency: () => setCurrency("usd"),
  };
};

export default useCurrency;
