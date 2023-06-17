import { UserModel } from './user.mongo.model.js';
import { UserRepo } from './user.mongo.repository.js';

describe('Given the UserRepo class', () => {
  describe('When it has been instantiate', () => {
    const repo = new UserRepo();

    test('Then the method getAll should be used', async () => {
      const exec = jest.fn().mockResolvedValue([]);
      UserModel.find = jest.fn().mockReturnValueOnce({
        exec,
      });
      const result = await repo.getAll();
      expect(UserModel.find).toHaveBeenCalled();
      expect(exec).toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    test('Then the method getById should be used', async () => {
      const mockId = '2';
      const mockFilm = { id: '2', title: '' };
      const exec = jest.fn().mockResolvedValue(mockFilm);
      UserModel.findById = jest.fn().mockReturnValueOnce({
        exec,
      });
      const result = await repo.getById(mockId);
      expect(UserModel.findById).toHaveBeenCalled();
      expect(exec).toHaveBeenCalled();
      expect(result).toEqual(mockFilm);
    });

    test('Then the method post should be used', async () => {
      const mockUser = {
        id: '1',
        userName: 'Nitin',
        email: 'nitin@isdi.com',
        password: 'abcd',
      };
      UserModel.create = jest.fn().mockReturnValueOnce(mockUser);
      const result = await repo.post(mockUser);
      expect(UserModel.create).toHaveBeenCalled();
      expect(result).toEqual(mockUser);
    });

    test('Then UserModel.search should have been called', async () => {
      const mockData = { key: '', value: '' };
      const exec = jest.fn().mockResolvedValue([]);
      UserModel.find = jest.fn().mockReturnValueOnce({
        exec,
      });
      const result = await repo.search(mockData);
      expect(UserModel.find).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });
});
