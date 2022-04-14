import { OrdersEntity } from './orders.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
// import { OrdersService } from './orders.service';
// import { OrdersController } from './orders.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OrdersEntity])],
  // controllers: [OrdersController],
  // providers: [OrdersService],
  // exports: [OrdersService],
})
export class OrdersModule {}
