import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteSubCategoryCommand } from '../impl/delete-sub-category.command';
import { SubCategoryRepository } from '@repositorise/repositories';

@CommandHandler(DeleteSubCategoryCommand)
export class DeleteSubCategoryHandler
  implements ICommandHandler<DeleteSubCategoryCommand>
{
  constructor(private readonly subCategoryRepository: SubCategoryRepository) {}
  async execute(command: DeleteSubCategoryCommand): Promise<any> {
    const { id } = command;
    return await this.subCategoryRepository.deleteSubCategory(id);
  }
}
