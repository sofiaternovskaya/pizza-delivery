import React, { useState, useEffect, useRef } from "react";
import useCurrency from "../../hooks/useCurrency";
import { TCurrency } from "../../types";
import { currencyMap } from "../../constants";
import style from "./CurrencyDropdown.module.css";

export function CurrencyDropdown() {
  const { currency, toggleCurrency } = useCurrency();

  const [isOpened, setIsOpened] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
        setIsOpened(() => false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const onOptionClicked = (option: TCurrency) => {
    toggleCurrency(option);
    setIsOpened(false);
  };

  return (
    <div className={style["currency-dropdown"]} ref={ref}>
      <div
        className={style["currency-dropdown-preview"]}
        onClick={() => setIsOpened((isOpened) => !isOpened)}
      >
        {currencyMap[currency]}
      </div>
      {isOpened && (
        <ul className={style["currency-dropdown-list"]}>
          {Object.entries(currencyMap)
            .filter(([key]) => key !== currency)
            .map(([key, val]) => (
              <li
                key={key}
                className={style["currency-dropdown-list-item"]}
                onClick={() => onOptionClicked(key as TCurrency)}
              >
                {val}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
