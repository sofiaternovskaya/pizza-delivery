import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Input } from "../../components/Input/Input";
import { InputPlaces } from "../../components/InputPlaces/InputPlaces";
import { Form } from "../../components/Form/Form";
import { phonePattern } from "../../constants";
import style from "./CreateOrderForm.module.css";

type TInputs = {
  name: string;
  address: string;
  phone: string;
};

type TData = {
  onSubmit: (data: TInputs) => Promise<void>;
  serverError: boolean;
};

export function CreateOrderForm({ onSubmit, serverError }: TData) {
  const { isAuthorised } = useAuth();

  return (
    <>
      {isAuthorised && (
        <Form<TInputs>
          onSubmit={onSubmit}
          header="Enter your delivery information"
          submitButtonText="Proceed"
          customClassName={serverError ? "server-error" : ""}
        >
          {serverError && (
            <span className={style["cart-server-error"]}>
              Something went wrong, please try again
            </span>
          )}

          <Input name="name" rules={{ required: true }} />
          <InputPlaces name="address" rules={{ required: true }} />
          <Input
            name="phone"
            rules={{
              required: true,
              pattern: phonePattern,
            }}
            errorMessages={{
              pattern: "Please check your phone number",
            }}
          />
        </Form>
      )}

      {!isAuthorised && (
        <div>
          To make an order, please <Link to="/login?cameFrom=cart">log in</Link>
        </div>
      )}
    </>
  );
}
