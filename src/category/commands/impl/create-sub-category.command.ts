import { ISubCategory } from '@interfaces/interfaces';

export class CreateSubCategoryCommand {
  constructor(
    public readonly subCategory: ISubCategory,
    public readonly categoryId: string,
  ) {}
}
