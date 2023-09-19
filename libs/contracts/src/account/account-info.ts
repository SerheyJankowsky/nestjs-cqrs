import { IUser } from '@interfaces/interfaces';

export namespace AccountInfo {
  export const topic = ':id';
  export class Request {
    id: string;
  }
  export class Response {
    user: IUser;
  }
}
