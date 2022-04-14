import { ManagersEntity } from './../src/managers/managers.entity';

const mockedManager: ManagersEntity = {
  id: expect.any(Number),
  email: 'blunshtelega@gmail.com',
  phoneNumber: '+79998885544',
  firstName: 'Pavel',
  lastName: 'Leonovich',
  createdAt: expect.any(Date),
};

export default mockedManager;
