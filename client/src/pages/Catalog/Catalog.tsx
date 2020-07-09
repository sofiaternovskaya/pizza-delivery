import React from "react";
import { Layout } from "../../components/Layout/Layout";
import { Title } from "../../components/Title/Title";
import { CatalogCategory } from "../../components/CatalogCategory/CatalogCategory";
import { TProductsData } from "../../types";
import style from "./Catalog.module.css";

export function Catalog() {
  return (
    <Layout<TProductsData> url="/product">
      {(data) => (
        <div className={style["catalog"]}>
          <Title size="second" text="Menu" />
          <CatalogCategory
            title="Pizza"
            category="pizza"
            data={data.products}
          />
          <CatalogCategory
            title="Drinks"
            category="drink"
            data={data.products}
          />
        </div>
      )}
    </Layout>
  );
}
