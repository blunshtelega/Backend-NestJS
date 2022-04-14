import { CustomValidationPipe } from './../src/utils/validation/customValidation.pipe';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

describe('App e2e', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new CustomValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });
  describe('ManagerModule', () => {
    beforeEach(async () => {
      const uncleared = await request(app.getHttpServer()).post(
        '/managers/find-all',
      );
      // console.log(uncleared);
      await Promise.all(
        uncleared.body.map(async (managers: any) => {
          return request(app.getHttpServer()).post(
            `/managers/delete/${managers.id}`,
          );
        }),
      );
    });

    it(`/POST create managers`, async () => {
      const expectedData = {
        email: 'blunshtelega@gmail.com',
        phoneNumber: '+79998885544',
        firstName: 'Pavel',
        lastName: 'Leonovich',
      };
      const data = await request(app.getHttpServer())
        .post('/managers/create')
        .send(expectedData)
        .expect(200);
      data.body.createdAt = undefined;
      expect(data.body).toEqual({
        ...expectedData,
        id: expect.any(Number),
        createdAt: undefined,
      });
      // Сразу протестить ручку findall
      const managers = await request(app.getHttpServer())
        .post('/managers/find-all')
        .expect(200);
      expect(managers.body).toEqual(expect.any(Array));
      expect(managers.body.length).toBe(1);
    });
    it('should throw an error because of failed validation', () => {
      return request(app.getHttpServer())
        .post('/managers/create')
        .send({
          email: 'blunshtelega@gmail.com',
          phoneNumber: '+79998885544',
          firstName: 1,
          lastName: 'Leonovich',
        })
        .expect(400);
    });

    // describe('should return all managers', () => {
    //   it('should return all managers', async () => {
    //     const test = await request(app.getHttpServer())
    //       .post('/managers/find-all')
    //       .send()
    //       .expect(200);
    //   });
    // });
  });
});
