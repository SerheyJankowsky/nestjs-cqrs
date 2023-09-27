export interface IUser {
  userName: string;
  email: string;
  password: string;
  id?: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IExtractUser {
  id: string;
  email: string;
  userName: string;
}
