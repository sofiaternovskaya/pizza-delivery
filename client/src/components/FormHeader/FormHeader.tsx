import React from "react";
import style from "./FormHeader.module.css";

export function FormHeader({ header }: { header: string }) {
  return <h2 className={style["form-header"]}>{header}</h2>;
}
