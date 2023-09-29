import { ICategory } from '@interfaces/interfaces/category/category.interface';
import { IThing } from '@interfaces/interfaces/thing/thing.intarface';

export interface IUser {
  userName: string;
  email: string;
  password: string;
  id?: string;
  categories?: ICategory[];
  things?: IThing[];
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IExtractUser {
  id: string;
  email: string;
  userName: string;
}
