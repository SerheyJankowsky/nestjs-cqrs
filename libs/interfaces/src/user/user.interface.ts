export interface IUser {
  readonly userName: string;
  readonly email: string;
  readonly password: string;
  readonly id?: string;
}

export interface ILogin {
  readonly email: string;
  readonly password: string;
}
