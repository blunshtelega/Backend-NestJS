import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthenticationService } from '../authentication.service';
import { UsersEntity } from '../../users/users.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthenticationService) {
    super({
      usernameField: 'email',
    });
  }
  // DONE
  // Ошибки отрабатываются в authenticationService.getAuthenticatedUser
  public async validate(email: string, password: string): Promise<UsersEntity> {
    return await this.authenticationService.getAuthenticatedUser(
      email,
      password,
    );
  }
}
