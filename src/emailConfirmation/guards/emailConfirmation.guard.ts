import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { IRequestWithUser } from '../../authentication/interfaces/requestWithUser.interface';

@Injectable()
export class EmailConfirmationGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: IRequestWithUser = context.switchToHttp().getRequest();

    if (!request.user?.isEmailConfirmed) {
      throw new UnauthorizedException(
        'Сперва подтвердите вашу почту | Confirm your email first',
      );
    }

    return true;
  }
}
