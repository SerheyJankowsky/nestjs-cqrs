import { ICategory } from '@interfaces/interfaces';

export class CreateCategoryCommand {
  constructor(
    public readonly category: ICategory,
    public readonly userId: string,
  ) {}
}
