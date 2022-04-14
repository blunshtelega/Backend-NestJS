import { ProductsEntity } from '../products/products.entity';
import { UsersEntity } from '../users/users.entity';
import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';

@Entity('orders')
export class OrdersEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @ManyToOne(() => UsersEntity, (user) => user.orders, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  user?: UsersEntity;

  @OneToMany(() => ProductsEntity, (products) => products.order)
  products?: ProductsEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;

  // orderRecipient - физическое лицо (user) или юридическое лицо (user.company)
  // orderPayment -
  // orderShipment - самовывоз/доставка ТК/доставка по городу
  // totalOrderPrice - цена заказа
  // orderStatus - enum schema - NOT NEED IT
}
