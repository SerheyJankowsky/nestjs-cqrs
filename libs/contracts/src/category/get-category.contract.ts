import { ICategory } from '@interfaces/interfaces';

export namespace GetCategoryContract {
  export const topic = ':id';

  export class Request {}

  export class Response {
    category: ICategory;
  }
}
