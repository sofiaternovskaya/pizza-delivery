import React, { ComponentType } from "react";
import { Route, Redirect } from "react-router-dom";
import useAuth from "../hooks/useAuth";

type TProps = {
  component: ComponentType<any>;
  path: string;
  exact?: boolean;
};

export function ProtectedRoute({ component: Component, path, exact }: TProps) {
  const { isAuthorised } = useAuth();

  return (
    <Route
      path={path}
      exact={exact}
      render={(props) => {
        if (isAuthorised) {
          return <Component {...props} />;
        }

        return (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
}
