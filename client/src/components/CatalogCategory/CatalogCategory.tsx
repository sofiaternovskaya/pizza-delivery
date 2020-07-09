import React from "react";
import { TProduct } from "../../types";
import { Title } from "../Title/Title";
import { CatalogItem } from "../../components/CatalogItem/CatalogItem";
import style from "./CatalogCategory.module.css";

type TProps = {
  title: string;
  category: string;
  data: TProduct[];
};

export function CatalogCategory({ title, category, data }: TProps) {
  return (
    <div className={style["catalog-category"]}>
      <Title size="third" text={title} />
      <div className={style["catalog-category-wrapper"]}>
        {data
          .filter((item) => item.type === category)
          .map(({ ...item }) => (
            <CatalogItem key={item.id} {...item} />
          ))}
      </div>
    </div>
  );
}
