import { IQrCodeStream } from './../interfaces/qrCodeStream.interface';
import { I2faGenerate } from './../interfaces/2faGenerate.interface';
import { Injectable, BadRequestException } from '@nestjs/common';
import { authenticator } from 'otplib';
import { toFileStream } from 'qrcode';
import { Response } from 'express';
import { UsersEntity } from '../../users/users.entity';
import { UsersService } from '../../users/users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TwoFactorAuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}
  // DONE
  public async generateTwoFactorAuthenticationSecret(
    user: UsersEntity,
  ): Promise<I2faGenerate> {
    const secret = authenticator.generateSecret();
    const issuer = this.configService.get('TWO_FACTOR_AUTHENTICATION_APP_NAME');
    const otpauthUrl = authenticator.keyuri(user.email, issuer, secret);

    await this.usersService.setTwoFactorAuthenticationSecret(secret, user.id);

    return {
      secret,
      otpauthUrl,
    };
  }
  // DONE
  public async isTwoFactorAuthenticationCodeValid(
    twoFactorAuthenticationCode: string,
    user: UsersEntity,
  ): Promise<boolean> {
    if (user.twoFactorAuthenticationSecret) {
      const secretKey: any = user.twoFactorAuthenticationSecret;
      return authenticator.verify({
        token: twoFactorAuthenticationCode,
        secret: secretKey,
      });
    } else {
      throw new BadRequestException(
        'Что-то пошло не так в блоке isTwoFactorAuthenticationCodeValid',
      );
    }
  }
  // DONE
  public async pipeQrCodeStream(
    stream: Response,
    otpauthUrl: string,
  ): Promise<IQrCodeStream> {
    return toFileStream(stream, otpauthUrl);
  }
}
