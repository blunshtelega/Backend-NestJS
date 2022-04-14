import {
  Body,
  Controller,
  Post,
  BadRequestException,
  Param,
  ParseIntPipe,
  HttpCode,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ManagersEntity } from './managers.entity';
import { UpdateManagerDto } from './dto/updateManager.dto';
import { CreateManagerDto } from './dto/createManager.dto';
import { ManagersService } from './managers.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('managers')
@ApiTags('Менеджеры')
@UseInterceptors(ClassSerializerInterceptor)
export class ManagersController {
  constructor(private readonly managersService: ManagersService) {}
  // DONE
  // СПЕЦИАЛЬНО ИЗМЕНИЛ ВОЗВРАЩАЕМОЕ ЗНАЧЕНИЕ ДЛЯ ТЕСТИРОВАНИЯ
  @ApiOperation({
    description: 'Создание менеджера (специально отдельной таблицой)',
  })
  @HttpCode(200)
  @Post('create')
  public async createManager(
    @Body() managerData: CreateManagerDto,
  ): Promise<ManagersEntity | BadRequestException> {
    return await this.managersService.createManager(managerData);
  }
  // DONE
  @ApiOperation({
    description: 'Выборка всех менеджеров (для id под updateManager)',
  })
  @HttpCode(200)
  @Post('find-all')
  // СПЕЦИАЛЬНО ИЗМЕНИЛ ВОЗВРАЩАЕМОЕ ЗНАЧЕНИЕ ДЛЯ ТЕСТИРОВАНИЯ
  public async findAllManagers(): Promise<ManagersEntity[]> {
    return await this.managersService.findAllManagers();
  }
  // DONE
  @ApiOperation({
    description: 'Обновить сущность по id',
  })
  @HttpCode(200)
  @Post('update')
  public async updateManager(
    @Body() managerData: UpdateManagerDto,
  ): Promise<ManagersEntity | BadRequestException> {
    return await this.managersService.updateManager(managerData);
  }
  // DONE
  @ApiOperation({
    description: 'Вытащить всех клиентов менеджера',
  })
  @HttpCode(200)
  @Post('find-one-with-users/:id')
  public async getManagerAndHisUsers(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ManagersEntity | BadRequestException> {
    return await this.managersService.getManagerByEmailWithAllUsers(id);
  }
  // DONE
  @ApiOperation({
    description: 'Удалить менеджера',
  })
  @HttpCode(200)
  @Post('delete/:id')
  public async deleteManager(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void | BadRequestException> {
    await this.managersService.deleteManager(id);
    // return 'Менеджер был успешно удален';
  }
}
