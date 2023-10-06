import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateSubCategoryCommand } from '../impl/update-sub-category.command';
import { ISubCategory } from '@interfaces/interfaces';
import { SubCategoryRepository } from '@repositorise/repositories';

@CommandHandler(UpdateSubCategoryCommand)
export class UpdateSubCategoryHandler
  implements ICommandHandler<UpdateSubCategoryCommand>
{
  constructor(private readonly subCategoryRepository: SubCategoryRepository) {}
  async execute(command: UpdateSubCategoryCommand): Promise<ISubCategory> {
    const { subCategory, id } = command;
    return await this.subCategoryRepository.updateSubCategory(subCategory, id);
  }
}
