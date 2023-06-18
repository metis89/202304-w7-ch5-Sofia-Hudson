import { User } from '../entities/user.js';
import createDebug from 'debug';
import { UserModel } from './user.mongo.model.js';
import { Repository } from './repository.js';
import { HttpError } from '../types/http.error.js';
const debug = createDebug('W7:UserRepo');

export class UserRepo implements Repository<User> {
  constructor() {
    debug('Instantiated', UserModel);
  }

  async getAll(): Promise<User[]> {
    const allData = await UserModel.find({}).exec();
    return allData;
  }

  async getById(id: string): Promise<User> {
    const result = await UserModel.findById(id).exec();
    if (result === null)
      throw new HttpError(400, 'Not found', 'No item found with this id.');
    return result;
  }

  async search({
    key,
    value,
  }: {
    key: string;
    value: unknown;
  }): Promise<User[]> {
    const result = await UserModel.find({ [key]: value }).exec();
    return result;
  }

  async post(data: Omit<User, 'id'>): Promise<User> {
    const newUser = await UserModel.create(data);
    return newUser;
  }

  async patch(id: string, data: Partial<User>): Promise<User> {
    const newBook = await UserModel.findByIdAndUpdate(id, data, {
      new: true,
    }).exec();
    if (newBook === null)
      throw new HttpError(404, 'Not found', 'Bad id for the update');
    return newBook;
  }

  async delete(id: string): Promise<void> {
    const result = await UserModel.findByIdAndDelete(id).exec();
    if (result === null)
      throw new HttpError(404, 'Not found', 'Bad id for the delete');
  }
}
