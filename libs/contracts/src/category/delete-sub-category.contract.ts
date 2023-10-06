import { ISubCategory } from '@interfaces/interfaces';

export namespace DeleteSubCategoryContract {
  export const topic = ':id';

  export class Request {
    id: string;
  }

  export class Response {
    subCategory: ISubCategory;
  }
}
