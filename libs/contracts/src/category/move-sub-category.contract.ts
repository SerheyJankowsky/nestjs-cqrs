import { ISubCategory } from '@interfaces/interfaces';
import { IsNotEmpty, IsString } from 'class-validator';

export namespace MoveSubCategoryContract {
  export const topic = ':id/move';
  export class Request {
    @IsNotEmpty()
    @IsString()
    categoryId: string;
  }
  export class Response {
    subCategory: ISubCategory;
  }
}
