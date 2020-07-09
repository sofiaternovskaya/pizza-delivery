import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Order } from "./order.entity";
import { Product } from "../product/product.entity";

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(
    () => Order,
    order => order.order_items
  )
  order: Order;

  // Should be unidirectional one-to-many but TypeORM doesnt support it:
  // https://github.com/typeorm/typeorm/issues/3233
  @ManyToMany(() => Product, {
    cascade: true,
  })
  @JoinTable()
  product: Product[];

  @Column()
  quantity: number;

  @Column()
  price_usd: number;

  @Column()
  price_eur: number;
}
