import { ILogin } from '@interfaces/interfaces';
export class LoginQuery implements ILogin {
  constructor(readonly email: string, readonly password: string) {}
}
