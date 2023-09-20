import { IUser } from '@interfaces/interfaces';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export namespace AccountUpdate {
  export const topic = ':id';
  export class Request {
    @IsString()
    @IsOptional()
    userName: string;
    @IsEmail()
    @IsOptional()
    email?: string;
  }
  export class Response {
    user: IUser;
  }
}
