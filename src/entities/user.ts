import { Book } from './book.js';

export type User = {
  id: string;
  userName: string;
  email: string;
  password: string;
  profilePicture: '';
  friend: User[];
  books: Book[];
};

export type UserLogin = {
  user: String; // UserName/email
  password: string;
};
