import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddManagerToUserDto } from './dto/addManagerToUser';
import { AddCompanyToUserDto } from './dto/addCompanyToUser';
import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Пользователи')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // TODO - убрать из пользователи эти методы
  @ApiOperation({
    description: 'Добавить компанию пользователю',
  })
  @HttpCode(200)
  @Post('add-company')
  public async addCompanyToUser(
    @Body() companyAndUserData: AddCompanyToUserDto,
  ) {
    return await this.usersService.addCompanyToUser(companyAndUserData);
  }
  // TODO - убрать из пользователи эти методы
  @ApiOperation({
    description: 'Добавить менеджера пользователю',
  })
  @HttpCode(200)
  @Post('add-manager')
  public async addManagerToUser(
    @Body() managerAndUserData: AddManagerToUserDto,
  ) {
    return await this.usersService.addManagerToUser(managerAndUserData);
  }

  @Post('test')
  public async test(@Body() email: string) {
    const foundUser = this.usersService.getByEmail(email);
    return foundUser;
  }
}
