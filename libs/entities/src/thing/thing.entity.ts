import { IThing, PartialThing } from '@interfaces/interfaces';

export class ThingEntity implements IThing {
  categoryId: string | null;
  description: string | null;
  id: string;
  name: string;
  subCategoryId: string | null;
  userId: string | null;
  tags: string[] | null;

  constructor(partial: PartialThing) {
    Object.assign(this, partial);
  }
}
