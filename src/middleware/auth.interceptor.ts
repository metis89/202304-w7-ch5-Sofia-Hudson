import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../types/http.error.js';
import { AuthServices, PayloadToken } from '../services/auth.js';
import createDebug from 'debug';
import { UserRepo } from '../repository/user.mongo.repository.js';

const debug = createDebug('W7:AuthInterceptor');

export class AuthInterceptor {
  // eslint-disable-next-line no-unused-vars
  constructor(private userRepo: UserRepo) {
    debug('Instantiated');
  }

  logged(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.get('Authorization');
      if (!authHeader)
        throw new HttpError(401, 'Not Authorized', 'Not Authorization Header');

      if (!authHeader.startsWith('Bearer'))
        throw new HttpError(
          401,
          'Not Authorized',
          'Not Bearer in athorization Header'
        );

      const token = authHeader.slice(7);
      const payload = AuthServices.verifyJWTGettingPayload(token);

      req.body.tokenPayload = payload;

      next();
    } catch (error) {
      next(error);
    }
  }

  async authorizedForSeeUsers(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body.tokenPayload) {
        throw new HttpError(
          498,
          'Token not found',
          'Token not found in Authorized interceptor'
        );
      }

      const { id: userId } = req.body.tokenPayload as PayloadToken;
      const { id: friendId } = req.params;

      const user = await this.userRepo.getById(friendId);

      if (user.id !== userId) {
        throw new HttpError(401, 'Not authorized', 'Not authorized');
      }

      next();
    } catch (error) {
      next(error);
    }
  }
}
