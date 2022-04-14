import { IRenderTemplate } from './authentication/interfaces/renderAuthTemplate.interface';
import { Controller, Get, HttpException, Render } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Тестовая стартовая страница')
export class AppController {
  constructor() {}

  @Get()
  @Render('mainpage/mainpage')
  public async renderIntroPage(): Promise<IRenderTemplate> {
    return { layout: 'layout', title: 'Hello there!' };
  }

  @Get('throw')
  throwError(): string {
    throw new HttpException({ message: 'Sample Error' }, 500);
  }
}
