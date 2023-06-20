import { Router as createRouter } from 'express';
import { Repository } from '../repository/repository.js';
import { User } from '../entities/user.js';
import { UserRepo } from '../repository/user.mongo.repository.js';
import { UserController } from '../controllers/user.constroller.js';
import { AuthInterceptor } from '../middleware/auth.interceptor.js';
import createDebug from 'debug';

const debug = createDebug('W7:UserRouter');

debug('Executed');

const repo: Repository<User> = new UserRepo();
const controller = new UserController(repo);
const interceptor = new AuthInterceptor(repo);
export const userRouter = createRouter();

userRouter.get('/', controller.getAll.bind(controller));
userRouter.get('/:id', controller.getById.bind(controller));
userRouter.post('/register', controller.register.bind(controller));
userRouter.patch('/login', controller.login.bind(controller));
userRouter.patch(
  '/addfriend/:id',
  interceptor.logged.bind(interceptor),
  controller.addNewFriend.bind(controller)
);
userRouter.patch(
  '/removefriend/:id',
  interceptor.logged.bind(controller),
  controller.removeFriend.bind(controller)
);

// UserRouter.patch('/login', controller.login.bind(controller));
