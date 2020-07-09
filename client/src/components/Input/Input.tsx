import React from "react";
import { useFormContext } from "react-hook-form";
import style from "./Input.module.css";

type TProps = {
  name: string;
  rules: object;
  errorMessages?: { [key: string]: string };
};

export function Input({ name, rules, errorMessages }: TProps) {
  const { errors, register } = useFormContext();
  const isError = errors[name] ? style["input-error"] : "";

  return (
    <div className={`${style["input"]} ${isError}`}>
      <label htmlFor={name} className={style["input-label"]}>
        {name}
      </label>
      <input
        id={name}
        name={name}
        ref={register(rules)}
        className={style["input-input"]}
      />
      {errors[name] && (
        <>
          {errors[name].type === "required" ? (
            <span className={style["input-error-message"]}>
              This field is required
            </span>
          ) : (
            <span className={style["input-error-message"]}>
              {errorMessages && errorMessages[errors[name].type]}
            </span>
          )}
        </>
      )}
    </div>
  );
}
