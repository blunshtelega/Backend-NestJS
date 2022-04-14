import { ManagersController } from './manager.controller';
import { ManagersEntity } from './managers.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagersService } from './managers.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([ManagersEntity])],
  providers: [ManagersService],
  controllers: [ManagersController],
  exports: [ManagersService],
})
export class ManagersModule {}
