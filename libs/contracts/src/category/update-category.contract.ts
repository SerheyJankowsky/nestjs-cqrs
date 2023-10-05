import { IsNotEmpty, IsString } from 'class-validator';
import { ICategory } from '@interfaces/interfaces';

export namespace UpdateCategoryContract {
  export const topic = ':id';

  export class Request {
    @IsNotEmpty()
    @IsString()
    name: string;
  }

  export class Response {
    category: ICategory;
  }
}
