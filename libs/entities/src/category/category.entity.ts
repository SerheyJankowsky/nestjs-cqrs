import { SubcategoryEntity } from '@entities/entities/category/subcategory.entity';
import { ICategory, PartialCategory } from '@interfaces/interfaces';

export class CategoryEntity implements ICategory {
  id: string;
  name: string;
  subCategories?: SubcategoryEntity[];

  constructor(partial: PartialCategory) {
    Object.assign(this, partial);
  }
}
