import { ApiBasicAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Get,
  ClassSerializerInterceptor,
  UseInterceptors,
  Render,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { IRequestWithUser } from './interfaces/requestWithUser.interface';
import { LocalAuthenticationGuard } from './guards/localAuthentication.guard';
import { UsersService } from '../users/users.service';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { EmailConfirmationService } from '../emailConfirmation/emailConfirmation.service';
import { UsersEntity } from '../users/users.entity';
import { CreateUserDto } from './../users/dto/createUser.dto';
import { IRenderTemplate } from './interfaces/renderAuthTemplate.interface';
import { JwtAuthenticationGuard } from './guards/jwt-authentication.guard';

@Controller('auth')
@ApiTags('Аутенфикация пользователя')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly usersService: UsersService,
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}
  // DONE
  @ApiOperation({
    description: 'Регистрация пользователя',
  })
  @HttpCode(200)
  @Post('registration')
  public async registration(
    @Body() userData: CreateUserDto,
  ): Promise<UsersEntity> {
    const newUser = await this.authenticationService.registration(userData);
    await this.emailConfirmationService.sendVerificationLink(userData.email);
    return newUser;
  }
  // DONE
  @ApiOperation({
    description: 'Рендер страницы регистрации',
  })
  @HttpCode(200)
  @Get('registration')
  @Render('auth/registration')
  public async renderRegistrationPage(): Promise<IRenderTemplate> {
    return { layout: 'auth', title: 'Регистрация' };
  }
  // DONE
  @ApiOperation({
    description: 'Рендер страницы авторизации',
  })
  @HttpCode(200)
  @Get('login')
  @Render('auth/login')
  public async renderLoginPage(): Promise<IRenderTemplate> {
    return { layout: 'auth', title: 'Авторизация' };
  }
  // DONE
  // Изменил код в if (user.isTwoFactorAuthenticationEnabled) умышленно
  @ApiOperation({
    description: 'Авторизация пользователя',
  })
  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @ApiBasicAuth() // По идее этот декораторо только тут пригодится
  @Post('login')
  public async logIn(
    @Req() request: IRequestWithUser,
  ): Promise<UsersEntity | string> {
    const { user } = request;
    const accessTokenCookie =
      await this.authenticationService.getCookieWithJwtAccessToken(user.id);
    const { cookie: refreshTokenCookie, token: refreshToken } =
      await this.authenticationService.getCookieWithJwtRefreshToken(user.id);

    await this.usersService.setCurrentRefreshToken(refreshToken, user.id);

    if (request.res) {
      request.res.setHeader('Set-Cookie', [
        accessTokenCookie,
        refreshTokenCookie,
      ]);
    }

    if (user.isTwoFactorAuthenticationEnabled) {
      return 'user'; // было просто return
    }

    return user;
  }
  // DONE
  @ApiOperation({
    description: 'Выход пользователя',
  })
  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  @Post('logout')
  public async logOut(@Req() request: IRequestWithUser): Promise<void> {
    await this.usersService.removeRefreshToken(request.user.id);
    if (request.res) {
      request.res.setHeader(
        'Set-Cookie',
        await this.authenticationService.getCookiesForLogOut(),
      );
    }
  }
  // DONE
  @ApiOperation({
    description: 'Рефреш токена',
  })
  @HttpCode(200)
  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  public async refresh(@Req() request: IRequestWithUser): Promise<UsersEntity> {
    const accessTokenCookie =
      await this.authenticationService.getCookieWithJwtAccessToken(
        request.user.id,
      );
    if (request.res) {
      request.res.setHeader('Set-Cookie', accessTokenCookie);
    }
    return request.user;
  }
}
