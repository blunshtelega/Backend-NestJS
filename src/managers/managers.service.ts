import { UpdateManagerDto } from './dto/updateManager.dto';
import { CreateManagerDto } from './dto/createManager.dto';
import { ManagersEntity } from './managers.entity';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ManagersService {
  constructor(
    @InjectRepository(ManagersEntity)
    private readonly managersRepository: Repository<ManagersEntity>,
  ) {}
  // DONE
  /**
   * A method that create new manager and save in repository
   * @returns A promise with the manager entity
   */
  public async createManager(
    managerData: CreateManagerDto,
  ): Promise<ManagersEntity | BadRequestException> {
    try {
      const newManager = this.managersRepository.create(managerData);
      await this.managersRepository.save(newManager);
      return newManager;
    } catch (e) {
      throw new BadRequestException('Что-то пошло не так (createManager)');
    }
  }
  // DONE
  // Отрабатывает без блока catch, чтобы не ругался TS и можно было использовать менеджера в user.service
  public async findManager(email: string): Promise<any> {
    const _foundManager = await this.managersRepository.findOne({ email });
    if (_foundManager) {
      return _foundManager;
    }
  }
  // DONE
  public async findAllManagers(): Promise<ManagersEntity[]> {
    try {
      return await this.managersRepository.find({});
    } catch (e) {
      throw new BadRequestException('Что-то пошло не так (findAllManagers)');
    }
  }
  // DONE
  // Альтернативная реализация через repository.update в updateCompany
  public async updateManager(
    managerData: UpdateManagerDto,
  ): Promise<ManagersEntity | BadRequestException> {
    const _foundManager = await this.managersRepository.findOne({
      where: { id: managerData.id },
    });
    if (!_foundManager) {
      throw new BadRequestException('Менеджера с таким ID не существует');
    }
    try {
      _foundManager.email = managerData.email || _foundManager.email;
      _foundManager.firstName =
        managerData.firstName || _foundManager.firstName;
      _foundManager.lastName = managerData.lastName || _foundManager.lastName;
      _foundManager.phoneNumber =
        managerData.phoneNumber || _foundManager.phoneNumber;
      _foundManager.updatedAt = new Date();
      return await this.managersRepository.save(_foundManager);
    } catch (e) {
      throw new BadRequestException('Что-то пошло не так (updateManager)');
    }
  }
  // DONE
  public async getManagerByEmailWithAllUsers(
    id: number,
  ): Promise<ManagersEntity | BadRequestException> {
    const _foundManager = await this.managersRepository.findOne(id, {
      relations: ['users'],
    });
    if (!_foundManager) {
      throw new BadRequestException('Менеджера с таким ID не существует');
    }
    try {
      return _foundManager;
    } catch (e) {
      throw new BadRequestException(
        'Что-то пошло не так (getManagerByEmailWithAllUsers)',
      );
    }
  }
  // DONE
  // Оставил исполнения с remove (insted of delete)
  public async deleteManager(id: number): Promise<void | BadRequestException> {
    const _foundManager = await this.managersRepository.findOne(id);
    if (!_foundManager) {
      throw new BadRequestException('Менеджера с таким ID не существует');
    }
    try {
      await this.managersRepository.remove(_foundManager);
    } catch (e) {
      throw new BadRequestException('Что-то пошло не так (deleteManager)');
    }
  }
}
