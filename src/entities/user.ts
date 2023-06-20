import { Book } from './book.js';

export type User = {
  id: string;
  userName: string;
  email: string;
  password: string;
  profilePicture: '';
  friends: User[];
  books: Book[];
};

export type UserLogin = {
  user: String; // UserName/email
  password: string;
};
