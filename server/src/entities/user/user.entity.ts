import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
} from "typeorm";
import { DateTimeEntity } from "../base/dateTimeEntity";
import { Order } from "../order/order.entity";

@Entity("user_auth", { orderBy: { id: "ASC" } })
export class User extends DateTimeEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @Unique(["email"])
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  lastLogin: string;

  @OneToMany(
    () => Order,
    order => order.user
  )
  orders: Order[];
}
