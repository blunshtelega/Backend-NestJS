import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UsersEntity } from '../users/users.entity';

@Entity('managers')
export class ManagersEntity {
  @ApiProperty({
    example: '1',
    description: 'Генерирующийся ID',
  })
  @PrimaryGeneratedColumn()
  public id!: number;

  @ApiProperty({
    example: 'mail@gmail.com',
    description: 'Почта менеджера',
  })
  @Column({
    type: 'text',
    unique: true,
  })
  public email!: string;

  @ApiProperty({
    example: '+76664442200',
    description: 'Телефон менеджера',
  })
  @Column({ type: 'text' })
  public phoneNumber!: string;

  @ApiProperty({
    example: 'Big',
    description: 'Имя менеджера',
  })
  @Column({ type: 'text' })
  public firstName!: string;

  @ApiProperty({
    example: 'Lebowski',
    description: 'Фамилия менеджера',
  })
  @Column({ type: 'text' })
  public lastName!: string;

  @ApiProperty({
    example: '01.01.0001',
    description: 'Дата создания сущности',
  })
  @CreateDateColumn({ type: 'timestamp' })
  // @Exclude()
  createdAt!: Date;

  @ApiProperty({
    example: '01.01.2007',
    description: 'Дата обновления сущности',
    nullable: true,
  })
  @ApiPropertyOptional()
  @Column({
    type: 'timestamp',
    nullable: true,
  })
  @Exclude()
  updatedAt?: Date;

  @ApiProperty({
    example: 'Сущность пользователя',
    description: 'One To Many',
    nullable: true,
    type: [UsersEntity],
  })
  @ApiPropertyOptional()
  @OneToMany(() => UsersEntity, (users) => users.manager)
  public users?: UsersEntity[];
}
