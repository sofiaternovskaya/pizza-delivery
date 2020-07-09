import React from "react";
import style from "./Loader.module.css";

export function Loader() {
  return (
    <div className={style["loader"]}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
