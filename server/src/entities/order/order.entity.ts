import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "../user/user.entity";
import { OrderItem } from "./order_item.entity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(
    () => User,
    user => user.orders
  )
  user: User;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  order_date: string;

  @OneToMany(
    () => OrderItem,
    orderItem => orderItem.order,
    {
      cascade: true,
    }
  )
  order_items: OrderItem[];

  @Column()
  user_name: string;

  @Column()
  user_phone_number: string;

  @Column()
  user_address: string;

  @Column()
  delivery_usd: number;

  @Column()
  delivery_eur: number;
}
