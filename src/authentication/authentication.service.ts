import {
  HttpException,
  HttpStatus,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ITokenPayload } from './interfaces/tokenPayload.interface';
import { UsersEntity } from '../users/users.entity';
import { ICookiesFromJwt } from './interfaces/cookiesWithJwt.interface';
import { CreateUserDto } from './../users/dto/createUser.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  // DONE
  public async registration(userData: CreateUserDto): Promise<UsersEntity> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    try {
      const createdUser = await this.usersService.create({
        ...userData,
        password: hashedPassword,
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      throw new HttpException(
        'Что-то пошло не так (registration)',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  // DONE
  public async getCookieWithJwtAccessToken(
    userId: number,
    isSecondFactorAuthenticated = false,
  ): Promise<string> {
    try {
      const payload: ITokenPayload = { userId, isSecondFactorAuthenticated };
      const token: string = this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
        expiresIn: `${this.configService.get(
          'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
        )}s`,
      });
      return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}`;
    } catch (error) {
      throw new BadRequestException(
        'Что-то пошло не так (getCookieWithJwtAccessToken)',
      );
    }
  }
  // DONE
  public async getCookieWithJwtRefreshToken(
    userId: number,
  ): Promise<ICookiesFromJwt> {
    try {
      const payload: ITokenPayload = { userId };
      const token = this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
        expiresIn: `${this.configService.get(
          'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
        )}s`,
      });
      const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      )}`;
      return {
        cookie,
        token,
      };
    } catch (error) {
      throw new BadRequestException(
        'Что-то пошло не так (getCookieWithJwtRefreshToken)',
      );
    }
  }
  // DONE
  public async getCookiesForLogOut(): Promise<Array<string>> {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    ];
  }
  // DONE
  public async getAuthenticatedUser(
    email: string,
    plainTextPassword: string,
  ): Promise<UsersEntity> {
    try {
      const user = await this.usersService.getByEmail(email);
      if (user.password) {
        await this.verifyPassword(plainTextPassword, user.password);
      }
      return user;
    } catch (error) {
      throw new HttpException(
        'USER - Предоставлены неверные учетные данные', // В verifyPassword аналогичная ошибка, чтобы нельзя было собрать базу email
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  // DONE
  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<void> {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'PASSWORD - Предоставлены неверные учетные данные',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
