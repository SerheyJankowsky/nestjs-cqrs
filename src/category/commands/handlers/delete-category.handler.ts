import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCategoryCommand } from '../impl/delete-category.command';
import { CategoryRepository } from '@repositorise/repositories';
import { ICategory } from '@interfaces/interfaces';

@CommandHandler(DeleteCategoryCommand)
export class DeleteCategoryHandler
  implements ICommandHandler<DeleteCategoryCommand>
{
  constructor(private readonly categoryRepository: CategoryRepository) {}
  execute(command: DeleteCategoryCommand): Promise<ICategory> {
    const { id } = command;
    try {
      return this.categoryRepository.deleteCategory(id);
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
