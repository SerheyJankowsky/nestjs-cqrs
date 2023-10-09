export interface IThing {
  userId: string | null;
  subCategoryId: string | null;
  name: string;
  id: string;
  description: string | null;
  categoryId: string | null;
  tags: string[] | null;
}

export type PartialThing = Partial<IThing>;
