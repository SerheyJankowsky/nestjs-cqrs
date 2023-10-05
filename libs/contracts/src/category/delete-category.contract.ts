import { ICategory } from '@interfaces/interfaces';

export namespace DeleteCategoryContract {
  export const topic = ':id';

  export class Request {}

  export class Response {
    category: ICategory;
  }
}
