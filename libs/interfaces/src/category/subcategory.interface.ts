import { IThing } from '@interfaces/interfaces/thing/thing.intarface';

export interface ISubCategory {
  categoryId: string;
  id: string;
  name: string;
  thing?: IThing[];
}

export type PartialSubCategory = Partial<ISubCategory>;
