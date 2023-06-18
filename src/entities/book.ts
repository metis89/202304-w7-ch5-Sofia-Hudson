import { User } from './user.js';

export type Book = {
  id: string;
  author: string;
  title: string;
  owner: User;
};
