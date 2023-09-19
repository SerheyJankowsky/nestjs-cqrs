import { IUser } from '@interfaces/interfaces';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export namespace AccountRegister {
  export const topic = '';
  export class Request implements IUser {
    @IsString()
    @IsNotEmpty()
    userName: string;
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @MinLength(6)
    @IsNotEmpty()
    password: string;
  }
  export class Response {
    user: IUser;
  }
}