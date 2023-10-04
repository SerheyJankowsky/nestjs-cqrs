import { ICategory } from '@interfaces/interfaces';
import { IsNotEmpty, IsString } from 'class-validator';

export namespace CreateCategoryContract {
  export const topic = '';
  export class Request implements ICategory {
    @IsNotEmpty()
    @IsString()
    name: string;
  }

  export class Response {
    category: ICategory;
  }
}
