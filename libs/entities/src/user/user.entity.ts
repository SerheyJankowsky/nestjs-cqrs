import { IUser } from '@interfaces/interfaces';
import { genSalt, hash } from 'bcrypt';

export class UserEntity implements IUser {
  public userName: string;
  public email: string;
  public password: string;
  public id?: string;

  constructor(user: IUser) {
    this.email = user.email;
    this.id = user.id;
    this.userName = user.userName;
  }

  public async hashPassword(password): Promise<void> {
    const salt = await genSalt(10);
    this.password = await hash(password, salt);
  }
}
