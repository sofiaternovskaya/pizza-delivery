import React, { ReactNode } from "react";
import useSWR from "swr";
import { Loader } from "../Loader/Loader";
import style from "./Layout.module.css";

type TProps<T> = {
  url: string;
  children(data: T): ReactNode;
};

export function Layout<TData>({ url, children }: TProps<TData>) {
  const { data, error } = useSWR(url);

  if (error) {
    return <div className={style["layout-grid"]}>{error.message}</div>;
  }

  if (data) {
    return <>{children(data)}</>;
  }

  return (
    <div className={style["layout-grid"]}>
      <Loader />
    </div>
  );
}
