import { IUser } from "../interfaces/IUserInterface";
import { Types, Document } from 'mongoose';

export class UserEntity implements IUser {
  document: number;
  id: string;
  name: string;
  email: string;
  password: string;
  Account: string[]

  constructor(id?:string, name?: string, email?: string, password?: string, document?: number, Account?:string[]) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.document = document;
    this.Account = Account
  }
}
