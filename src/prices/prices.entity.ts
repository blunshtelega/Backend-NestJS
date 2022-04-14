import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('prices')
export class PricesEntity {
  @ApiProperty({
    example: '1',
    description: 'Генерирующийся ID',
  })
  @PrimaryGeneratedColumn()
  public id!: number;

  @ApiProperty({
    example: 'price.xls',
    description: 'Загружаемый файл',
  })
  @Column({ type: 'text' })
  public file!: string;

  @ApiProperty({
    example: 'Прайс от 01.01.2021',
    description: 'Название прайса',
  })
  @Column({ type: 'text' })
  public title!: string;

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
