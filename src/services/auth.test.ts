import { AuthServices, PayloadToken } from './auth';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcrypt';

jest.mock('jsonwebtoken');
jest.mock('bcrypt');

describe('Given AuthServices class', () => {
  describe('When I use createJWT', () => {
    test('Then jwt sign should have been called', () => {
      const payload = {} as PayloadToken;
      AuthServices.createJWT(payload);
      expect(jwt.sign).toHaveBeenCalled();
    });
  });

  describe('When method verifyJWTGettingPayload is called', () => {
    test('Then verify function should have been called', () => {
      const token = {} as string;
      const result = AuthServices.verifyJWTGettingPayload(token);
      expect(jwt.verify).toHaveBeenCalled();
      expect(result).toEqual(token);
    });
  });

  describe('When method AuthServices.hash is called', () => {
    test('Then hash should have been called', () => {
      const value = 'Test';
      AuthServices.hash(value);
      expect(bcryptjs.hash).toHaveBeenCalled();
    });
  });
  describe('When method AuthServices.compare is called', () => {
    test('Then compare should have been called', () => {
      const hash = 'Test';
      const value = 'Test';
      AuthServices.compare(value, hash);
      expect(bcryptjs.compare).toHaveBeenCalled();
    });
  });
});
