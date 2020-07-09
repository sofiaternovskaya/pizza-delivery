import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Delivery {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  delivery_usd: number;

  @Column()
  delivery_eur: number;
}
