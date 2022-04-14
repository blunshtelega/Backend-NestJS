import { ApiProperty } from '@nestjs/swagger';
import { ManagersEntity } from './../managers/managers.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { OrdersEntity } from '../orders/orders.entity';
import { CompaniesEntity } from '../companies/companies.entity';
import { UserRole } from './roles/role.enum';

@Entity('users')
export class UsersEntity {
  @ApiProperty({
    example: '1',
    description: 'Генерирующийся ID',
  })
  @PrimaryGeneratedColumn()
  public id!: number;

  @ApiProperty({
    example: 'mail.@mail.ru',
    description: 'Почта пользователя',
  })
  @Column({
    type: 'text',
    unique: true,
  })
  public email!: string;

  @ApiProperty({
    example: '+79998884422',
    description: 'Телефон',
    nullable: true,
  })
  @Column({
    type: 'text',
    nullable: true,
  })
  public phoneNumber?: string;

  @ApiProperty({
    example: 'Pavel',
    description: 'Имя пользователя',
  })
  @Column({ type: 'text' })
  public firstName!: string;

  @ApiProperty({
    example: 'Lebovski',
    description: 'Фамилия пользователя',
    nullable: true,
  })
  @Column({
    type: 'text',
    nullable: true,
  })
  public lastName?: string;

  @ApiProperty({
    example: 'verystrongpassword',
    description: 'Пароль пользователя',
    nullable: true,
  })
  @Column({
    type: 'text',
    nullable: true,
  })
  @Exclude()
  public password?: string;

  @ApiProperty({
    example: '15',
    description: 'Скидка пользователя',
    nullable: true,
  })
  @Column({
    type: 'int',
    nullable: true,
  })
  public personalDiscount?: number;

  @ApiProperty({
    example: 'user',
    description: 'Роль пользователя',
  })
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.User,
  })
  public role!: UserRole;

  @ApiProperty({
    example: 'ХХХХХ',
    description: 'Хешированный токен',
    nullable: true,
  })
  @Column({
    type: 'text',
    nullable: true,
  })
  @Exclude()
  public currentHashedRefreshToken?: string | null;

  @ApiProperty({
    example: 'secret',
    description: 'Секрет 2FA',
    nullable: true,
  })
  @Column({
    type: 'text',
    nullable: true,
  })
  public twoFactorAuthenticationSecret?: string;

  @ApiProperty({
    example: 'true',
    description: 'Включен ли 2FA',
    default: false,
  })
  @Column({
    type: 'boolean',
    default: false,
  })
  public isTwoFactorAuthenticationEnabled!: boolean;

  @ApiProperty({
    example: 'true',
    description: 'Подтвержден ли email',
    default: false,
  })
  @Column({
    type: 'boolean',
    default: false,
  })
  public isEmailConfirmed!: boolean;

  @ApiProperty({
    example: 'Сущность компании',
    description: 'Many To One',
    nullable: true,
    type: CompaniesEntity,
  })
  @ManyToOne(
    () => CompaniesEntity,
    (company: CompaniesEntity) => company.users,
    { cascade: true, onDelete: 'SET NULL' },
  )
  public company?: CompaniesEntity;

  @ApiProperty({
    example: 'Сущность менеджера',
    description: 'Many To One',
    nullable: true,
    type: ManagersEntity,
  })
  @ManyToOne(() => ManagersEntity, (manager: ManagersEntity) => manager.users, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  public manager?: ManagersEntity;

  @ApiProperty({
    example: 'Сущность заказа',
    description: 'One To Many',
    nullable: true,
    type: OrdersEntity,
  })
  @OneToMany(() => OrdersEntity, (orders: OrdersEntity) => orders.user)
  public orders?: OrdersEntity[];

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
