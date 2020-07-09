import { TCurrency } from "./types";

export const currencyMap: { [key in TCurrency]: string } = {
  usd: "$",
  eur: "€",
};

export const phonePattern = /^((\+7|7|8)+([0-9]){10})$/;

export const emailPattern = /[^@]+@[^.]+\..+/g;
