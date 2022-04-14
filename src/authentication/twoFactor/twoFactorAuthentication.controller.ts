import {
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
  Res,
  UseGuards,
  Req,
  Body,
  UnauthorizedException,
  HttpCode,
} from '@nestjs/common';
import { TwoFactorAuthenticationService } from './twoFactorAuthentication.service';
import { Response } from 'express';
import { JwtAuthenticationGuard } from '../guards/jwt-authentication.guard';
import { IRequestWithUser } from '../interfaces/requestWithUser.interface';
import { UsersService } from '../../users/users.service';
import { TwoFactorAuthenticationCodeDto } from './dto/twoFactorAuthenticationCode.dto';
import { AuthenticationService } from '../authentication.service';
import { UsersEntity } from '../../users/users.entity';
import { IQrCodeStream } from './../interfaces/qrCodeStream.interface';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('2fa')
@ApiTags('2FA')
@UseInterceptors(ClassSerializerInterceptor) // Сериализация для исключения ряда данных из ответов
export class TwoFactorAuthenticationController {
  constructor(
    private readonly twoFactorAuthenticationService: TwoFactorAuthenticationService,
    private readonly usersService: UsersService,
    private readonly authenticationService: AuthenticationService,
  ) {}
  // DONE
  @ApiOperation({
    description: 'Генерация ключа 2FA',
  })
  @HttpCode(200)
  @Post('generate')
  @UseGuards(JwtAuthenticationGuard)
  public async register(
    @Res() response: Response,
    @Req() request: IRequestWithUser,
  ): Promise<IQrCodeStream> {
    const { otpauthUrl } =
      await this.twoFactorAuthenticationService.generateTwoFactorAuthenticationSecret(
        request.user,
      );

    return this.twoFactorAuthenticationService.pipeQrCodeStream(
      response,
      otpauthUrl,
    );
  }
  // DONE
  @ApiOperation({
    description: 'Включить 2FA авторизацию',
  })
  @HttpCode(200)
  @Post('turn-on')
  @UseGuards(JwtAuthenticationGuard)
  public async turnOnTwoFactorAuthentication(
    @Req() request: IRequestWithUser,
    @Body() { twoFactorAuthenticationCode }: TwoFactorAuthenticationCodeDto,
  ): Promise<void> {
    const isCodeValid =
      await this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(
        twoFactorAuthenticationCode,
        request.user,
      );
    if (!isCodeValid) {
      throw new UnauthorizedException('Неверный код аутентификации');
    }
    await this.usersService.turnOnTwoFactorAuthentication(request.user.id);
  }
  // DONE
  @ApiOperation({
    description: 'Аутентификация через 2FA',
  })
  @HttpCode(200)
  @Post('authenticate')
  @UseGuards(JwtAuthenticationGuard)
  public async authenticate(
    @Req() request: IRequestWithUser,
    @Body() { twoFactorAuthenticationCode }: TwoFactorAuthenticationCodeDto,
  ): Promise<UsersEntity> {
    const isCodeValid =
      await this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(
        twoFactorAuthenticationCode,
        request.user,
      );
    if (!isCodeValid) {
      throw new UnauthorizedException('Неверный код аутентификации');
    }

    const accessTokenCookie =
      await this.authenticationService.getCookieWithJwtAccessToken(
        request.user.id,
        true,
      );
    if (request.res) {
      request.res.setHeader('Set-Cookie', [accessTokenCookie]);
    }

    return request.user;
  }
}
