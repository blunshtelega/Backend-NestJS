import { Request } from 'express';
import { UsersEntity } from '../../users/users.entity';

export interface IRequestWithUser extends Request {
  user: UsersEntity;
}
