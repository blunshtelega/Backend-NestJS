import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CategoriesEntity } from './../categories/categories.entity';
import { OrdersEntity } from '../orders/orders.entity';

@Entity('products')
export class ProductsEntity {
  @ApiProperty({
    example: '1',
    description: 'Генерирующийся ID',
  })
  @PrimaryGeneratedColumn()
  public id!: number;

  @ApiProperty({
    example: 'ПН00140',
    description: 'Артикул товара',
  })
  @Column({
    type: 'text',
    unique: true,
    nullable: false,
  })
  public productCode!: string;

  @ApiProperty({
    example: 'Перчатки нитриловые',
    description: 'Наименование товара',
  })
  @Column({ type: 'text' })
  public title!: string;

  @ApiProperty({
    example: '420',
    description: 'Цена товара',
  })
  @Column({ type: 'int' })
  public productPrice!: number;

  @ApiProperty({
    example: 'Сущность заказа',
    description: 'Many To One',
    nullable: true,
    type: OrdersEntity,
  })
  @ManyToOne(() => OrdersEntity, (order) => order.products, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  public order?: OrdersEntity;

  @ApiProperty({
    example: 'Сущность категории',
    description: 'Many To One',
    nullable: true,
    type: CategoriesEntity,
  })
  @ManyToOne(() => CategoriesEntity, (category) => category.products, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  public category?: CategoriesEntity;

  @ApiProperty({
    example: '01.01.2021',
    description: 'Дата создания сущности',
  })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @ApiProperty({
    example: '01.01.2021',
    description: 'Дата обновления сущности',
    nullable: true,
  })
  @Column({
    type: 'timestamp',
    nullable: true,
  })
  updatedAt?: Date;
}
