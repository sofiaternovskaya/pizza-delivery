import React, { ReactNode } from "react";
import style from "./OrderPageInfo.module.css";

type TProps = {
  title: string;
  value?: string;
  children?: ReactNode;
};

export function OrderPageInfo({ title, value, children }: TProps) {
  return (
    <div className={style["order-page-info"]}>
      <span className={style["order-page-info-title"]}>{title}</span>
      {value}
      {children}
    </div>
  );
}
