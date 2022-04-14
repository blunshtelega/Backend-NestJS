// import { OrdersEntity } from './orders.entity';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Injectable } from '@nestjs/common';
// import { Repository } from 'typeorm';

// @Injectable()
// export class OrdersService {
//   constructor(
//     @InjectRepository(OrdersEntity)
//     private readonly ordersRepository: Repository<OrdersEntity>,
//   ) {}

//   public async createOrder(orderData: CreateOrderDto): Promise<OrdersEntity> {
//     const newOrder = this.ordersRepository.create(orderData);
//     await this.ordersRepository.save(newOrder);
//   }
// }
