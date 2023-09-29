import { ISubCategory, PartialSubCategory } from '@interfaces/interfaces';

export class SubcategoryEntity implements ISubCategory {
  categoryId: string;
  id: string;
  name: string;
  constructor(partial: PartialSubCategory) {
    Object.assign(this, partial);
  }
}
