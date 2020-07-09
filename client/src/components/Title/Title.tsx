import React from "react";
import style from "./Title.module.css";

type TProps = {
  size: "first" | "second" | "third";
  text: string;
  light?: boolean;
};

export function Title({ size, text, light }: TProps) {
  const ligthClass = light ? style["title-light"] : "";
  let TitleElement: keyof JSX.IntrinsicElements = "h1";

  switch (size) {
    case "second":
      TitleElement = "h2";
      break;
    case "third":
      TitleElement = "h3";
  }

  return (
    <TitleElement className={`${style[`title-${TitleElement}`]} ${ligthClass}`}>
      {text}
    </TitleElement>
  );
}
