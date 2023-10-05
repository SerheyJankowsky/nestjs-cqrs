import { ICategory } from '@interfaces/interfaces';

export namespace GetCategoriesContract {
  export const topic = '';
  export class Request {
    userId: string;
  }
  export class Response {
    categories: ICategory[];
  }
}
