import { ISubCategory } from '@interfaces/interfaces';

export namespace GetSubCategoryContract {
  export const topic = ':id';
  export class Request {
    id: string;
  }
  export class Response {
    subCategory: ISubCategory;
  }
}
