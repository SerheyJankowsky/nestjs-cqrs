import { IUser } from '@interfaces/interfaces';

export class UpdateUserCommand implements Partial<IUser> {
  constructor(
    readonly id: string,
    readonly userName?: string,
    readonly email?: string,
  ) {}
}
