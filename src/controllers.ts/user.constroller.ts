/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { UserRepo } from '../repository/user.mongo.repository.js';
import { AuthServices, PayloadToken } from '../services/auth.js';
import { HttpError } from '../types/http.error.js';
import { LoginResponse } from '../types/response.api.js';
import createDebug from 'debug';
const debug = createDebug('W7:UserController ');

export class UserController {
  constructor(public repo: UserRepo) {
    debug('Instantiated');
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const passwd = await AuthServices.hash(req.body.password);
      req.body.password = passwd;
      res.status(201);
      res.send(await this.repo.post(req.body));
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body.user || !req.body.password)
        throw new HttpError(400, 'Bad Request', 'Invalid user or password');
      let data = await this.repo.search({
        key: 'userName',
        value: req.body.user,
      });
      if (!data.length) {
        data = await this.repo.search({
          key: 'email',
          value: req.body.user,
        });
      }

      if (!data.length) {
        throw new HttpError(400, 'Bad Request', 'Invalid user or password');
      }

      const isUserValid = await AuthServices.compare(
        req.body.password,
        data[0].password
      );

      if (!isUserValid)
        throw new HttpError(400, 'Bad Request', 'Invalid user or password');

      const payload: PayloadToken = {
        id: data[0].id,
        userName: data[0].userName,
      };
      const token = AuthServices.createJWT(payload);
      const response: LoginResponse = {
        token,
        user: data[0],
      };

      res.send(response);
    } catch (error) {
      next(error);
    }
  }
}
