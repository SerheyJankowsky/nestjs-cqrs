import { IUser } from '@interfaces/interfaces';
import { compare, genSalt, hash } from 'bcrypt';

export class UserEntity implements IUser {
  public userName: string;
  public email: string;
  public password: string;
  public id?: string;

  constructor(user: IUser) {
    this.email = user.email;
    this.id = user.id;
    this.userName = user.userName;
    this.password = user.password;
  }

  public async hashPassword(password): Promise<void> {
    const salt = await genSalt(10);
    this.password = await hash(password, salt);
  }

  public async validatePassword(password: string): Promise<boolean> {
    if (this.password) {
      return await compare(password, this.password);
    }
    return false;
  }

  public update(user: IUser) {
    this.userName = user.userName;
    this.email = user.email;
  }
}
