import { PartialSubCategory } from '@interfaces/interfaces';

export class UpdateSubCategoryCommand {
  constructor(
    public readonly subCategory: PartialSubCategory,
    public readonly id: string,
  ) {}
}
