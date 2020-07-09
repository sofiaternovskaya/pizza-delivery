import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

export enum ProductType {
  PIZZA = "pizza",
  DRINK = "drink",
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @Unique(["name"])
  name: string;

  @Column("enum", { enum: ProductType })
  type: ProductType;

  @Column()
  description: string;

  @Column()
  src: string;

  @Column()
  price_usd: number;

  @Column()
  price_eur: number;
}
