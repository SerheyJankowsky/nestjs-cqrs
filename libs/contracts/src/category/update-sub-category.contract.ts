import { ISubCategory, PartialSubCategory } from '@interfaces/interfaces';
import { IsNotEmpty, IsString } from 'class-validator';

export namespace UpdateSubCategoryContract {
  export const topic = ':id';

  export class Request implements PartialSubCategory {
    @IsNotEmpty()
    @IsString()
    name: string;
    image: string;
  }
  export class Response {
    subCategory: ISubCategory;
  }
}
