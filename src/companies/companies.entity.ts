import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { UsersEntity } from '../users/users.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('companies')
export class CompaniesEntity {
  @ApiProperty({
    example: '1',
    description: 'Генерирующийся ID',
  })
  @PrimaryGeneratedColumn()
  public id!: number;

  @ApiProperty({
    example: 'ООО "СПМК"',
    description: 'Название компании',
  })
  @Column({ type: 'text' })
  public companyName!: string;

  @ApiProperty({
    example: '2460113920',
    description: 'ИНН компании',
  })
  @Column({
    type: 'text',
    unique: true,
  })
  public taxpayerIdentificationNumber!: string;

  @ApiProperty({
    example: '89998887766',
    description: 'Телефон компании',
  })
  @Column({ type: 'text' })
  public companyTelephoneNumbers!: string;

  @ApiProperty({
    example: 'Красноярск',
    description: 'Город доставки',
  })
  @Column({ type: 'text' })
  public shipmentCity!: string;

  @ApiProperty({
    example: 'Баумана',
    description: 'Улица доставки',
  })
  @Column({ type: 'text' })
  public shipmentStreet!: string;

  @ApiProperty({
    example: '20В',
    description: 'Дом доставки',
  })
  @Column({ type: 'text' })
  public shipmentHouseNumber!: string;

  @ApiProperty({
    example: 'Корпус 5',
    description: 'Дополнительные данные для доставки',
    nullable: true,
  })
  @Column({
    type: 'text',
    nullable: true,
  })
  public shipmentAdditionalHouseNumber?: string;

  @ApiProperty({
    example: '211',
    description: 'Офис доставки',
    nullable: true,
  })
  @Column({
    type: 'text',
    nullable: true,
  })
  public shipmentOffice?: string;

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

  @ApiProperty({
    example: 'Сущность пользователя',
    description: 'One To Many',
    nullable: true,
    type: UsersEntity,
  })
  @OneToMany(() => UsersEntity, (users) => users.company)
  public users?: UsersEntity[];
}
