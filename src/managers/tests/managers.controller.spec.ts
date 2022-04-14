import { CreateManagerDto } from '../dto/createManager.dto';
// import { BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ManagersEntity } from '../managers.entity';
import { ManagersService } from '../managers.service';
import { ManagersController } from '../manager.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { response } from 'express';

describe('ManagersController', () => {
  let managersController: ManagersController;
  let managersService: ManagersService;

  // const managersEntity = {
  //   id: expect.any(Number),
  //   email: 'email@gmail.com',
  //   phoneNumber: '+76664442200',
  //   firstName: 'Pavel',
  //   lastName: 'Leonovich',
  //   createdAt: expect.any(Date),
  // };

  // const dtoData = {
  //   email: 'polina@mail.ru',
  //   phoneNumber: '+9029112411',
  //   firstName: 'Rostovceva',
  //   lastName: 'Rostovceva',
  // };

  // let result: Promise<ManagersEntity[]>;
  // let result2: Promise<ManagersEntity>;
  // let result3: Promise<void | BadRequestException>;
  // let id: number;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ManagersController],
      providers: [
        ManagersService,
        {
          provide: getRepositoryToken(ManagersEntity),
          useValue: {},
        },
      ],
    }).compile();

    managersService = moduleRef.get<ManagersService>(ManagersService);
    managersController = moduleRef.get<ManagersController>(ManagersController);
  });

  describe('createManager', () => {
    it('should create manager', async () => {
      const newManager = new ManagersEntity();
      const dtoData = new CreateManagerDto();
      jest
        .spyOn(managersService, 'createManager')
        .mockResolvedValue(newManager);
      expect(response.statusCode).toBe(200);
      expect(await managersController.createManager(dtoData)).toBe(newManager);
    });
    // it('shouldnt create manager', async () => {
    //   let result: Promise<BadRequestException>;
    //   let qq: 'bullshit';
    //   jest
    //     .spyOn(managersService, 'createManager')
    //     .mockImplementation(() => result);
    //   expect(response.statusCode).toBe(200);
    //   expect(await managersController.createManager({}).toBe(result);
    // });
  });
  // Все равно отрабатывает?
  describe('findAllManagers', () => {
    let result: ManagersEntity[];
    let ffs: number;
    it('should return an array of managers', async () => {
      jest
        .spyOn(managersService, 'findAllManagers')
        .mockImplementation(() => Promise.resolve(result));
      expect(response.statusCode).toBe(200);
      expect(await managersController.findAllManagers()).toBe(ffs);
    });
  });

  // describe('deleteManager', () => {
  //   it('should delete manager', async () => {
  //     // const result = new BadRequestException;
  //     jest
  //       .spyOn(managersService, 'deleteManager')
  //       .mockImplementation(() => result3);

  //     expect(await managersService.deleteManager(id)).toBe(result);
  //   });
  // });
});
