import React, { ReactNode } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { FormHeader } from "../FormHeader/FormHeader";
import { PrimaryButton } from "../PrimaryButton/PrimaryButton";
import style from "./Form.module.css";

type TProps<T> = {
  onSubmit: SubmitHandler<T>;
  header?: string;
  submitButtonText?: string;
  children: ReactNode;
  customClassName?: string;
};

export function Form<TInputs>({
  onSubmit,
  header,
  submitButtonText,
  children,
  customClassName,
}: TProps<TInputs>) {
  const methods = useForm<TInputs>();
  const { handleSubmit } = methods;

  const propsClassName = customClassName ? style[customClassName] : "";

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${style["form"]} ${propsClassName}`}
      >
        {header && <FormHeader header={header} />}
        {children}
        <PrimaryButton text={submitButtonText} />
      </form>
    </FormProvider>
  );
}
