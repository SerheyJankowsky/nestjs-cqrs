import { IUser } from '@interfaces/interfaces';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export namespace AccountRegister {
  export const topic = 'register';
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
    repeatPassword: string;
  }
  export class Response {
    token: string;
    user: IUser;
  }
}
