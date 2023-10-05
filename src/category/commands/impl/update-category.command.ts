import { PartialCategory } from '@interfaces/interfaces';

export class UpdateCategoryCommand {
  constructor(
    public readonly category: PartialCategory,
    public readonly id: string,
  ) {}
}
