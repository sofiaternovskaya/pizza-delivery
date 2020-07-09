import React from "react";
import style from "./PrimaryButton.module.css";

type TProps = {
  text?: string;
  type?: string;
  onClick?: () => void;
  propClass?: string;
};

export function PrimaryButton({ text, type, onClick, propClass }: TProps) {
  const propStyle = propClass ? style[propClass] : "";

  return (
    <input
      type={type ? type : "submit"}
      className={`${style["primary-button"]} ${propStyle}`}
      value={text}
      onClick={onClick}
    />
  );
}
