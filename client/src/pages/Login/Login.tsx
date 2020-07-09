import React, { useState } from "react";
import { useHistory, RouteComponentProps } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useFetcher } from "../../hooks/useFetcher";
import { Input } from "../../components/Input/Input";
import { Form } from "../../components/Form/Form";
import { emailPattern } from "../../constants";
import style from "./Login.module.css";

type TInputs = {
  email: string;
  password: string;
};

export function Login(props: RouteComponentProps) {
  const history = useHistory();
  const fetcher = useFetcher();

  const cameFrom = props.location.search.replace("?cameFrom=", "");
  const [serverError, setServerError] = useState(false);

  const { toggleAuthorised } = useAuth();

  const onSubmit = async (data: TInputs) => {
    try {
      await fetcher("/user/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
      });

      toggleAuthorised(true);
      if (cameFrom === "cart") {
        history.push(`/${cameFrom}`);
      } else {
        history.push("/user");
      }
    } catch (err) {
      setServerError(true);
    }
  };

  return (
    <div className={style["login"]}>
      <Form<TInputs>
        onSubmit={onSubmit}
        header="Log in"
        customClassName={serverError ? "server-error" : ""}
      >
        {serverError && (
          <span className={style["login-error"]}>
            Your email or login are incorrect
          </span>
        )}

        <Input
          name="email"
          rules={{ required: true, pattern: emailPattern }}
          errorMessages={{
            pattern: "Please check your email",
          }}
        />

        <Input name="password" rules={{ required: true }} />
      </Form>
    </div>
  );
}
