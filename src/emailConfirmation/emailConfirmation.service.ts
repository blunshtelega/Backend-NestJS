import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IVerificationTokenPayload } from './interfaces/verificationTokenPayload.interface';
import { EmailService } from '../email/email.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class EmailConfirmationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    private readonly usersService: UsersService,
  ) {}
  // DONE (убрал изначальный return)
  public async sendVerificationLink(email: string): Promise<void> {
    try {
      const payload: IVerificationTokenPayload = { email };
      const token = this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
        expiresIn: `${this.configService.get(
          'JWT_VERIFICATION_TOKEN_EXPIRATION_TIME',
        )}s`,
      });

      const url = `${this.configService.get(
        'EMAIL_CONFIRMATION_URL',
      )}?token=${token}`;

      const text = `Спасибо за регистрацию! Для подтверждения Вашего аккаунт, перейдите по ссылке: ${url}`;

      await this.emailService.sendMail({
        to: email,
        subject: 'Подтверждение почты',
        text,
      });
    } catch (error) {
      throw new BadRequestException(
        'Что-то пошло не так (sendVerificationLink)',
      );
    }
  }
  // DONE
  public async decodeConfirmationToken(token: string): Promise<string> {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      });

      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }
      throw new BadRequestException();
    } catch (error: any) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Время жизни токена истекло');
      }
      throw new BadRequestException('Неверный токен');
    }
  }
  // DONE
  public async confirmEmail(email: string): Promise<void> {
    try {
      const user = await this.usersService.getByEmail(email);
      if (user.isEmailConfirmed) {
        throw new BadRequestException('Почта уже подтвержденна');
      }
      await this.usersService.markEmailAsConfirmed(email);
    } catch (error) {
      throw new BadRequestException('Что-то пошло не так (confirmEmail)');
    }
  }
  // DONE
  public async resendConfirmationLink(userId: number): Promise<void> {
    try {
      const user = await this.usersService.getById(userId);
      if (user.isEmailConfirmed) {
        throw new BadRequestException('Почта уже подтвержденна');
      }
      await this.sendVerificationLink(user.email);
    } catch (error) {
      throw new BadRequestException(
        'Что-то пошло не так (resendConfirmationLink)',
      );
    }
  }
}
