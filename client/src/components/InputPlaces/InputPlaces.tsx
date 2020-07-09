import React, { ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";
import usePlacesAutocomplete from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import style from "./InputPlaces.module.css";

type TProps = { name: string; rules: object };

export function InputPlaces({ name, rules }: TProps) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
  });

  const { errors, register } = useFormContext();

  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSelect = ({ description }: { description: string }) => () => {
    setValue(description, false);
    clearSuggestions();
  };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          key={id}
          onClick={handleSelect(suggestion)}
          className={style["input-places-suggestion"]}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  const errorClass = errors["address"] ? style["input-places-error"] : "";

  return (
    <div ref={ref} className={`${style["input-places"]} ${errorClass}`}>
      <label htmlFor={name} className={style["input-places-label"]}>
        address
      </label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={handleInput}
        disabled={!ready}
        className={style["input-places-input"]}
        ref={register(rules)}
      />
      {status === "OK" && (
        <ul className={style["input-places-suggestions-wrapper"]}>
          {renderSuggestions()}
        </ul>
      )}
      {errors[name] && (
        <>
          {errors[name].type === "required" && (
            <span className={style["input-places-error-message"]}>
              This field is required
            </span>
          )}
        </>
      )}
    </div>
  );
}
