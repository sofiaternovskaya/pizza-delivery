import React, { ReactType } from "react";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export function PublicRoute({
  component: Component,
  path,
  exact,
}: {
  component: ReactType<RouteComponentProps>;
  path: string;
  exact?: boolean;
}) {
  const { isAuthorised } = useAuth();

  return (
    <Route
      path={path}
      exact={exact}
      render={(props) => {
        if (!isAuthorised) {
          return (
            <>
              <Component {...props} />
            </>
          );
        } else {
          return (
            <Redirect
              to={{
                pathname: "/user",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
}
