import { SubcategoryEntity } from '@entities/entities/category/subcategory.entity';
import { ICategory, PartialCategory } from '@interfaces/interfaces';

export class CategoryEntity implements ICategory {
  description: string | null;
  id: string;
  name: string;
  userId: string | null;
  subCategories?: SubcategoryEntity[];

  constructor(partial: PartialCategory) {
    Object.assign(this, partial);
  }
}
