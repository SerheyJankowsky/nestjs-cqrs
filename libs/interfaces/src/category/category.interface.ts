import { ISubCategory } from '@interfaces/interfaces/category/subcategory.interface';
import { IThing } from '@interfaces/interfaces/thing/thing.intarface';

export interface ICategory {
  userId?: string | null;
  name: string;
  id?: string;
  subCategories?: ISubCategory[];
  thing?: IThing[];
}

export type PartialCategory = Partial<ICategory>;
