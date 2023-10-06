import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MoveSubCategoryCommand } from '../impl/move-sub-category.command';
import { SubCategoryRepository } from '@repositorise/repositories';
import { ISubCategory } from '@interfaces/interfaces';

@CommandHandler(MoveSubCategoryCommand)
export class MoveSubCategoryHandler
  implements ICommandHandler<MoveSubCategoryCommand>
{
  constructor(private readonly subCategoryRepository: SubCategoryRepository) {}
  async execute(command: MoveSubCategoryCommand): Promise<ISubCategory> {
    const { categoryId, id } = command;
    return this.subCategoryRepository.updateSubCategoryCategory(id, categoryId);
  }
}
