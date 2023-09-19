import { IUser } from '@interfaces/interfaces';
import { IsEmail, IsString, MinLength } from 'class-validator';

export namespace AccountUpdate {
  export const topic = ':id';
  export class Request implements IUser {
    @IsString()
    userName: string;
    @IsEmail()
    email: string;
    @MinLength(6)
    password: string;
  }
  export class Response {
    user: IUser;
  }
}
