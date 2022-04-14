import { BadRequestException } from '@nestjs/common';
import { CreateManagerDto } from '../dto/createManager.dto';
import { ManagersEntity } from '../managers.entity';
import { ManagersService } from '../managers.service';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ManagerService', () => {
  let managerService: ManagersService;

  const createManagerDto = new CreateManagerDto();
  const managerEntity = new ManagersEntity();
  const mockManagersRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((ManagersEntity) => Promise.resolve(ManagersEntity)),
    findOne: jest
      .fn()
      .mockImplementation(() => Promise.resolve(ManagersEntity)),
    find: jest.fn().mockImplementation(() => Promise.resolve(ManagersEntity)),
    remove: jest.fn().mockImplementation(() => Promise.resolve()),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ManagersService,
        {
          provide: getRepositoryToken(ManagersEntity),
          useValue: mockManagersRepository,
        },
      ],
    }).compile();
    managerService = await module.get(ManagersService);
  });

  it('should be defined', async () => {
    expect(ManagersService).toBeDefined();
  });

  describe('create manager', () => {
    it('should create a manager', async () => {
      expect(await managerService.createManager(createManagerDto)).toEqual(
        managerEntity,
      );
    });
  });

  describe('find one manager', () => {
    it('should find and return a manager', async () => {
      const findOneNoteSpy = jest.spyOn(managerService, 'findManager');
      const findOneOptions = 'mail@mail.ru';
      managerService.findManager(findOneOptions);
      expect(findOneNoteSpy).toHaveBeenCalledWith(findOneOptions);
    });
  });
  // Первое исполнение
  describe('find all managers', () => {
    const result: ManagersEntity[] = [];
    it('should find and return all managers', async () => {
      jest
        .spyOn(managerService, 'findAllManagers')
        .mockImplementation(() => Promise.resolve(result));
    });
  });
  // Второе исполнение
  describe('find all managers', () => {
    const result: ManagersEntity[] = [];
    it('should find and return all managers', async () => {
      jest.spyOn(managerService, 'findAllManagers');
      try {
        return result;
      } catch (e) {
        throw new BadRequestException();
      }
    });
  });
});
