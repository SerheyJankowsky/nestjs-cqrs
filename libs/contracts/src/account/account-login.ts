import { IUser } from '@interfaces/interfaces';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export namespace AccountLogin {
  export const topic = '';
  export class Request {
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
