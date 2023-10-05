import { ISubCategory, IThing } from '@interfaces/interfaces';
import { IsNotEmpty, IsString } from 'class-validator';

export namespace CreateSubCategoryContract {
  export const topic = '';

  export class Request implements ISubCategory {
    @IsNotEmpty()
    @IsString()
    categoryId: string;
    image: string;
    @IsNotEmpty()
    @IsString()
    name: string;
    thing: IThing[];
  }

  export class Response {
    subCategory: ISubCategory;
  }
}
