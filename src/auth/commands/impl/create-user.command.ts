import { IUser } from '@interfaces/interfaces';

export class CreateUserCommand implements IUser {
  constructor(
    readonly userName: string,
    readonly email: string,
    readonly password: string,
  ) {}
}
