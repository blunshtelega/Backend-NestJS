import { AddManagerToUserDto } from './dto/addManagerToUser';
import { AddCompanyToUserDto } from './dto/addCompanyToUser';
import { ManagersEntity } from './../managers/managers.entity';
import { ManagersService } from './../managers/managers.service';
import { CompaniesEntity } from './../companies/companies.entity';
import { CompaniesService } from './../companies/companies.service';
import {
  HttpException,
  HttpStatus,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { UsersEntity } from './users.entity';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    private readonly companyService: CompaniesService,
    private readonly managerService: ManagersService,
  ) {}
  // DONE
  async markEmailAsConfirmed(email: string): Promise<UpdateResult> {
    try {
      const emailConfirmed = await this.usersRepository.update(
        { email },
        {
          isEmailConfirmed: true,
        },
      );
      return emailConfirmed;
    } catch {
      throw new BadRequestException(
        'Что-то пошло не так (markEmailAsConfirmed)',
      );
    }
  }
  // DONE
  async getByEmail(email: string): Promise<UsersEntity> {
    const _user = await this.usersRepository.findOne({ email });
    if (_user) {
      return _user;
    }
    throw new HttpException(
      'Пользователя с такой почтой не существует | User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }
  // DONE
  async create(userData: CreateUserDto): Promise<UsersEntity> {
    const newUser = this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    return newUser;
  }
  // DONE
  async getById(id: number): Promise<UsersEntity> {
    const _user = await this.usersRepository.findOne({ id });
    if (_user) {
      return _user;
    }
    throw new HttpException(
      'Пользователя с таким ID не существует | User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }
  // DONE
  async removeRefreshToken(userId: number): Promise<void> {
    await this.usersRepository.update(userId, {
      currentHashedRefreshToken: null,
    });
  }
  // DONE (убрал return)
  async setTwoFactorAuthenticationSecret(
    secret: string,
    userId: number,
  ): Promise<void> {
    await this.usersRepository.update(userId, {
      twoFactorAuthenticationSecret: secret,
    });
  }
  // DONE (сохранил return)
  async turnOnTwoFactorAuthentication(userId: number): Promise<UpdateResult> {
    return await this.usersRepository.update(userId, {
      isTwoFactorAuthenticationEnabled: true,
    });
  }
  // DONE
  async getUserIfRefreshTokenMatches(
    refreshToken: string,
    userId: number,
  ): Promise<UsersEntity> {
    const user = await this.getById(userId);
    const comparePassword: any = user.currentHashedRefreshToken;
    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      comparePassword,
    );
    if (isRefreshTokenMatching) {
      return user;
    } else {
      throw new BadRequestException();
    }
  }
  // DONE
  async setCurrentRefreshToken(
    refreshToken: string,
    userId: number,
  ): Promise<void> {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.usersRepository.update(userId, {
      currentHashedRefreshToken,
    });
  }
  // NEW ONE
  public async addCompanyToUser(
    companyAndUserData: AddCompanyToUserDto,
  ): Promise<any> {
    const _foundUser = await this.usersRepository.findOne({
      where: { email: companyAndUserData.userEmail },
      relations: ['company'],
    });
    const _foundCompany: CompaniesEntity =
      await this.companyService.findCompanyByTaxpayerNumber(
        companyAndUserData.taxpayerIdentificationNumber,
      );
    if (_foundUser) {
      _foundUser.company = _foundCompany;
      const updatedUser = await this.usersRepository.save(_foundUser);
      return updatedUser;
    }
  }
  // NEW ONE
  public async addManagerToUser(
    managerAndUserData: AddManagerToUserDto,
  ): Promise<any> {
    const _foundUser = await this.usersRepository.findOne({
      where: { email: managerAndUserData.userEmail },
      relations: ['manager'],
    });
    const _foundManager: ManagersEntity = await this.managerService.findManager(
      managerAndUserData.managerEmail,
    );
    if (_foundUser) {
      _foundUser.manager = _foundManager;
      const updatedUser = await this.usersRepository.save(_foundUser);
      return updatedUser;
    }
  }
}
